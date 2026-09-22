import { expect, test } from "@playwright/test";

test.describe("Responsive layout tests", () => {
  test("fits mobile viewport and exposes usable controls", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const fits = () =>
      page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
    expect(await fits()).toBeTruthy();

    await page.locator(".menu-toggle").click();
    expect(await fits()).toBeTruthy();
    await page.locator(".menu-toggle").click();

    const controls = page.locator(
      ".menu-toggle, [data-occasion], .enquiry-form input, .enquiry-form select, .enquiry-form textarea, .whatsapp-button"
    );
    for (let index = 0; index < (await controls.count()); index += 1) {
      expect((await controls.nth(index).boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await page.locator("#occasions").scrollIntoViewIfNeeded();
    await expect(page.locator(".floating-enquire")).toHaveClass(/is-visible/);
    expect((await page.locator(".floating-enquire").boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(
      44
    );
  });
});
