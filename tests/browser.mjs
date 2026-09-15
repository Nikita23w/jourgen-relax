import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch();
const errors = [];
const page = await browser.newPage({ reducedMotion: 'reduce' });
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
const url = process.env.SITE_URL || 'http://127.0.0.1:4173';
await mkdir('artifacts', { recursive: true });
try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(async () => { for (const image of document.images) { image.loading = 'eager'; await image.decode(); } });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}px`);
    assert.equal(await page.locator('main section').count(), 9);
    await page.screenshot({ path: `artifacts/page-${width}.png`, fullPage: true });
  }
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  await page.locator('#navigation').getByRole('link', { name: 'Тарифы' }).click();
  assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'false');
  for (const name of ['Доминант', 'Покорный', 'Хулиган', 'Нежный']) {
    const button = page.getByRole('button', { name, exact: false });
    await button.click();
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
    await page.locator('.mood-photo img').evaluate(img => img.decode());
  }
  await page.locator('.plan-button').nth(1).click();
  assert.match(await page.locator('.selection').innerText(), /Жамк Deluxe/);
  await page.getByRole('button', { name: 'Убрать выбранный тариф' }).click();
  assert.doesNotMatch(await page.locator('.selection').innerText(), /Жамк Deluxe/);
  for (const details of await page.locator('details').all()) {
    await details.locator('summary').click();
    assert.equal(await details.evaluate(el => el.open), true);
    await details.locator('summary').click();
  }
  for (const link of await page.locator('a[href^="tel:"]').all()) assert.equal(await link.getAttribute('href'), 'tel:+7XXXXXXXXXX');
  for (const link of await page.locator('a[href^="#"]').all()) {
    const target = await link.getAttribute('href');
    assert.equal(await page.locator(target).count(), 1, target);
  }
  assert.deepEqual(errors, []);
  console.log(`PASS ${url}: 5 widths, all sections, images, navigation, 4 moods, plan selection, 10 disclosures, telephone links; no console errors or failed resources.`);
} finally { await browser.close(); }
