const { test, expect } = require('@playwright/test');

test.describe('Animation preferences (prefers-reduced-motion)', () => {

  test('respects prefers-reduced-motion: reduce', async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Go to the page and wait for the dom content to be loaded
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Wait for the scripts to be parsed and IIFE to execute
    // Since reduced motion skips GSAP timelines, elements should immediately be visible

    // The IIFE runs gsap.set to set opacity to 1 instantly.
    const elementsToCheck = [
      '.t-sydney',
      '.t-nsw',
      '.t-company',
      '.t-uc',
      '.t-inquiryLabel',
      '.t-phoneLabel',
      '.t-email',
      '.t-phone',
      '.t-fine',
      '.t-divider',
      '.t-logo'
    ];

    for (const selector of elementsToCheck) {
      const locator = page.locator(selector);
      await expect(locator).toBeVisible();

      // Verify opacity is 1 inline style set by GSAP
      const style = await locator.getAttribute('style');
      expect(style).toContain('opacity: 1');
    }
  });

  test('plays animations with prefers-reduced-motion: no-preference', async ({ page }) => {
    // Emulate normal motion
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    // Go to the page
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // The IIFE first sets opacity to 0, then timelines them to 1.
    // In normal motion, elements should start with opacity: 0 and eventually reach opacity: 1.
    // We can check if GSAP added the inline opacity: 0 right after load.

    const sydneyLocator = page.locator('.t-sydney');

    // Wait for the timeline to complete (staggered animations)
    // Use expect with a polling check or just wait until it has opacity: 1
    await expect(sydneyLocator).toBeVisible({ timeout: 5000 });

    // Check that it reaches opacity: 1 eventually (or a value very close to it)
    await expect(sydneyLocator).toHaveCSS('opacity', '1', { timeout: 5000 });
  });

});
