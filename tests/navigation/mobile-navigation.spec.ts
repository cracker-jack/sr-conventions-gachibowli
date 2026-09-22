import { expect, test } from "@playwright/test";

test.describe("Responsive navigation tests", () => {
  test("toggles mobile menu accessibly", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.locator(".menu-toggle");
    const nav = page.locator("#site-nav");

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).not.toHaveClass(/is-open/);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toHaveClass(/is-open/);
    await expect(nav.getByRole("link", { name: "Occasions" })).toBeVisible();

    await nav.getByRole("link", { name: "Occasions" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).not.toHaveClass(/is-open/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });
});
