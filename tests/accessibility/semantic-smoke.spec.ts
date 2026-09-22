import { expect, test } from "@playwright/test";

test.describe("Accessibility smoke tests", () => {
  test("has semantic structure and keyboard-visible controls", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/");

    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.locator("h2").count()).toBeGreaterThan(3);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("nav")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.locator('.skip-link[href="#main"]')).toHaveCount(1);
    await expect(page.locator("#main")).toHaveCount(1);

    const images = page.locator("img");
    for (let index = 0; index < (await images.count()); index += 1) {
      expect((await images.nth(index).getAttribute("alt"))?.trim()).toBeTruthy();
    }

    const roleImages = page.locator('[role="img"]');
    for (let index = 0; index < (await roleImages.count()); index += 1) {
      expect((await roleImages.nth(index).getAttribute("aria-label"))?.trim()).toBeTruthy();
    }

    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.locator(".brand").first()).toBeFocused();
    expect(errors).toEqual([]);
  });
});
