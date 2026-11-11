import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(process.cwd(), 'docs/validation_screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runPlaytest() {
  console.log('Launching Chrome for M4.6 UI Playtest...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Desktop Playtest: 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // 1. Desktop Prologue
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_prologue_m46.png') });
  console.log('Captured desktop prologue');

  // Journey 1: Open Prologue -> Chapters -> Start Game
  const chaptersLink = await page.$('[data-route="chapters"]');
  if (chaptersLink) await chaptersLink.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_chapters_m46.png') });
  console.log('Captured desktop chapters');

  // Filter Chapters
  const restoredFilter = await page.$('.chapter-filter-btn[data-filter="unlocked"]');
  if (restoredFilter) await restoredFilter.click();
  await new Promise(r => setTimeout(r, 400));

  // Enter Memory Chapter 1 -> HUD
  const enterBtn = await page.$('#enter-chapter-01');
  if (enterBtn) await enterBtn.click();
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_gameplay_hud_m46.png') });
  console.log('Captured desktop gameplay HUD');

  // Journey 2: Pause -> Settings
  const pauseBtn = await page.$('#hud-pause-btn');
  if (pauseBtn) await pauseBtn.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_pause_overlay_m46.png') });
  console.log('Captured desktop pause overlay');

  const settingsBtn = await page.$('#pause-settings-btn');
  if (settingsBtn) await settingsBtn.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_settings_modal_m46.png') });
  console.log('Captured desktop settings modal');

  // Close Settings
  const settingsClose = await page.$('#settings-close-btn');
  if (settingsClose) await settingsClose.click();
  await new Promise(r => setTimeout(r, 400));

  // Journey 3: Archive -> Fragment modal
  const archiveLink = await page.$('[data-route="archive"]');
  if (archiveLink) await archiveLink.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_archive_m46.png') });
  console.log('Captured desktop archive');

  // Open Reading Modal
  const fragmentCard = await page.$('.archive-item-card[data-id="42"]');
  if (fragmentCard) await fragmentCard.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_reading_modal_m46.png') });
  console.log('Captured desktop reading modal');

  // Close Reading Modal
  const readingClose = await page.$('#reading-close-btn');
  if (readingClose) await readingClose.click();
  await new Promise(r => setTimeout(r, 400));

  // Journey 4: Ledger -> Simulate & Export
  const ledgerLink = await page.$('[data-route="ledger"]');
  if (ledgerLink) await ledgerLink.click();
  await new Promise(r => setTimeout(r, 600));
  
  const simEarn = await page.$('#btn-simulate-earn');
  if (simEarn) await simEarn.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_1440x900_ledger_m46.png') });
  console.log('Captured desktop ledger');

  // --- MOBILE AUDIT (390 x 844) ---
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // Mobile Prologue
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_390x844_prologue_m46.png') });
  console.log('Captured mobile prologue');

  // Mobile Chapters
  const mobileChaptersTab = await page.$('nav [data-route="chapters"]');
  if (mobileChaptersTab) await mobileChaptersTab.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_390x844_chapters_m46.png') });
  console.log('Captured mobile chapters');

  // Mobile HUD
  const mobileHUDTab = await page.$('nav [data-route="hud"]');
  if (mobileHUDTab) await mobileHUDTab.click();
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_390x844_hud_m46.png') });
  console.log('Captured mobile HUD');

  // Mobile Pause
  const mobilePause = await page.$('#btn-pause');
  if (mobilePause) await mobilePause.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_390x844_pause_m46.png') });
  console.log('Captured mobile pause');

  // Close Pause
  const pauseResume = await page.$('#pause-resume-btn');
  if (pauseResume) await pauseResume.click();
  await new Promise(r => setTimeout(r, 400));

  // Mobile Archive
  const mobileArchiveTab = await page.$('nav [data-route="archive"]');
  if (mobileArchiveTab) await mobileArchiveTab.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_390x844_archive_m46.png') });
  console.log('Captured mobile archive');

  // Mobile Ledger
  const mobileLedgerTab = await page.$('nav [data-route="ledger"]');
  if (mobileLedgerTab) await mobileLedgerTab.click();
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_390x844_ledger_m46.png') });
  console.log('Captured mobile ledger');

  await browser.close();
  console.log('All playtest journeys completed successfully!');
}

runPlaytest().catch((err) => {
  console.error('Playtest error:', err);
  process.exit(1);
});
