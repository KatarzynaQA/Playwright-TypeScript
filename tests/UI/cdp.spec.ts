import { expect, test } from '@playwright/test';

test.describe('CDP communication', () => {
  test('Emulate network throttle', async ({ context, page }) => {
    // Arrange:
    const tableSelector = 'results-table';
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = 'get-weather';
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    // https://chromedevtools.github.io/devtools-protocol/tot/Network/
    await cdpSession.send('Network.emulateNetworkConditions', NETWORK_PRESETS.slow3GConditions);

    // Act:
    await page.goto('/practice/random-weather-v2.html');
    await page.waitForLoadState('domcontentloaded');

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

  test('No throttle', async ({ context, page }) => {
    // Arrange:
    const tableSelector = 'results-table';
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = 'get-weather';
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send('Network.emulateNetworkConditions', NETWORK_PRESETS.noThrottle);

    // Act:
    await page.goto('/practice/random-weather-v2.html');
    await page.waitForLoadState('domcontentloaded');

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

  test('Script Execution Disabled', async ({ context, page }) => {
    // Arrange:
    const tableSelector = 'results-table';
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = 'get-weather';
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send('Emulation.setScriptExecutionDisabled', {
      value: true,
    });

    // Act:
    await page.goto('/practice/random-weather-v2.html');
    await page.waitForLoadState('domcontentloaded');

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeHidden();
  });

  test('Mobile view', async ({ context, page }) => {
    // Arrange:
    const tableSelector = 'results-table';
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = 'get-weather';
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send('Emulation.setDeviceMetricsOverride', {
      deviceScaleFactor: 1,
      mobile: true,
      width: 420,
      height: 800,
    });

    // Act:
    await page.goto('/practice/random-weather-v2.html');
    await page.waitForLoadState('domcontentloaded');

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
  });

  test('Performance metrics', async ({ context, page }) => {
    // Arrange:
    const tableSelector = 'results-table';
    const tableLocator = page.getByTestId(tableSelector);
    const buttonSelector = 'get-weather';
    const buttonLocator = page.getByTestId(buttonSelector);

    const cdpSession = await context.newCDPSession(page);
    await cdpSession.send('Performance.enable');

    // Act:
    await page.goto('/practice/random-weather-v2.html');
    await page.waitForLoadState('domcontentloaded');

    await buttonLocator.click();

    // Assert:
    await expect(tableLocator).toBeVisible();
    //const metrics = await cdpSession.send('Performance.getMetrics');
    //console.log(metrics.metrics);
  });
});

export const NETWORK_PRESETS = {
  offline: {
    offline: true,
    downloadThroughput: 0,
    uploadThroughput: 0,
    latency: 0,
  },
  noThrottle: {
    offline: false,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0,
  },
  slow3GConditions: {
    offline: false,
    downloadThroughput: ((500 * 1000) / 8) * 0.8,
    uploadThroughput: ((500 * 1000) / 8) * 0.8,
    latency: 400 * 5,
  },
  fast3GConditions: {
    offline: false,
    downloadThroughput: ((1.6 * 1000 * 1000) / 8) * 0.9,
    uploadThroughput: ((750 * 1000) / 8) * 0.9,
    latency: 150 * 3.75,
  },
};
