import { expect, test } from "@playwright/test";

test.describe("Responsive navigation tests", () => {
  test("shows working navigation on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const nav = page.locator("#site-nav");
    await expect(nav).toBeVisible();

    for (const target of ["occasions", "gallery", "location", "enquire"]) {
      const link = nav.locator(`a[href="#${target}"]`);
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${target}$`));
      await expect(page.locator(`#${target}`)).toBeVisible();
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });
});
