import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Architectural verification test.
 * Asserts that pure simulation modules in `src/sim` NEVER import or directly reference
 * DOM, Canvas, window, document, or browser rendering APIs.
 */
describe('Architecture Boundary Enforcement: src/sim', () => {
  const simDir = path.resolve(__dirname, '../../src/sim');

  function getFiles(dir: string): string[] {
    const results: string[] = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        results.push(...getFiles(fullPath));
      } else if (item.name.endsWith('.ts')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const forbiddenTerms = [
    'window',
    'document',
    'canvas',
    'CanvasRenderingContext2D',
    'HTMLCanvasElement',
    'HTMLElement',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'localStorage',
    'indexedDB',
    'AudioContext',
    '@renderer',
    '@input',
    '@ui'
  ];

  it('contains zero DOM, Canvas, or rendering dependencies in src/sim', () => {
    const files = getFiles(simDir);
    expect(files.length).toBeGreaterThan(0);

    const violations: { file: string; line: number; term: string; content: string }[] = [];

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      // Strip both // and /* */ comments
      const noBlockComments = content.replace(/\/\*[\s\S]*?\*\//g, '');
      const lines = noBlockComments.split('\n');

      lines.forEach((lineText, idx) => {
        // Strip single line comments
        const cleanLine = lineText.replace(/\/\/.*$/, '');
        for (const term of forbiddenTerms) {
          // Check for word boundaries of forbidden terms
          const regex = new RegExp(`\\b${term}\\b`);
          if (regex.test(cleanLine)) {
            violations.push({
              file: path.relative(simDir, filePath),
              line: idx + 1,
              term,
              content: lineText.trim()
            });
          }
        }
      });
    }

    if (violations.length > 0) {
      console.error('Architectural boundary violations found in src/sim:', violations);
    }

    expect(violations).toEqual([]);
  });
});
