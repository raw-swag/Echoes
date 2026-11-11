import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(process.cwd(), 'docs/validation_screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runViewportAudit() {
  console.log('Running Viewport Acceptance Audit (1280x800 Desktop & 360x800 Mobile)...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const networkFailures = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', req => {
    networkFailures.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  // 1. DESKTOP VIEWPORT: 1280 x 800
  console.log('Auditing Desktop 1280x800...');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1280x800_prologue_m46.png') });

  // Navigate to HUD
  await page.click('[data-route="hud"]');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1280x800_hud_m46.png') });

  // Open Pause on 1280x800
  await page.click('#hud-pause-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1280x800_pause_m46.png') });

  // Open Settings on 1280x800
  await page.click('#pause-settings-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1280x800_settings_m46.png') });
  await page.click('#settings-close-btn');
  await new Promise(r => setTimeout(r, 400));

  // Resume directly from HUD
  await page.click('[data-route="archive"]');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1280x800_archive_m46.png') });

  // 2. MOBILE VIEWPORT: 360 x 800 (Compact Mobile)
  console.log('Auditing Mobile 360x800...');
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // Mobile Prologue 360x800
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_360x800_prologue_m46.png') });

  // Enter HUD
  const mobileHUDTab = await page.$('nav [data-route="hud"]');
  if (mobileHUDTab) await mobileHUDTab.click();
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_360x800_hud_m46.png') });

  // Test Mobile Touch Controls: Move Left, Move Right, Jump, Echo
  console.log('Executing mobile gameplay interactions on 360x800...');
  const btnLeft = await page.$('#btn-touch-left');
  const btnRight = await page.$('#btn-touch-right');
  const btnJump = await page.$('#btn-jump');
  const btnEcho = await page.$('#btn-activate-echo');

  if (btnLeft && btnRight && btnJump && btnEcho) {
    // Hold move right for 500ms
    await page.touchscreen.tap(100, 100); // warm up touch
    await btnRight.hover();
    await page.mouse.down();
    await new Promise(r => setTimeout(r, 400));
    await page.mouse.up();

    // Tap Jump
    await btnJump.click();
    await new Promise(r => setTimeout(r, 300));

    // Tap Echo Trace
    await btnEcho.click();
    await new Promise(r => setTimeout(r, 500));
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_360x800_hud_gameplay_active_m46.png') });

  // Open Pause on 360x800
  await page.click('#btn-pause');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_360x800_pause_m46.png') });
  await page.click('#pause-resume-btn');
  await new Promise(r => setTimeout(r, 300));

  // Ledger on 360x800
  const mobileLedgerTab = await page.$('nav [data-route="ledger"]');
  if (mobileLedgerTab) await mobileLedgerTab.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_360x800_ledger_m46.png') });

  await browser.close();

  console.log('Audit completed!');
  console.log('Console Errors:', consoleErrors);
  console.log('Network Failures:', networkFailures);

  fs.writeFileSync(
    path.join(process.cwd(), 'docs/browser_audit_log.json'),
    JSON.stringify({ consoleErrors, networkFailures, timestamp: new Date().toISOString() }, null, 2)
  );
}

runViewportAudit().catch(err => {
  console.error('Audit failure:', err);
  process.exit(1);
});
