import { expect, test } from "@playwright/test";

test.describe("Location link tests", () => {
  test("uses secure Google Maps links", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('a[href*="google.com/maps"]');
    await expect(links).toHaveCount(2);

    for (let index = 0; index < 2; index += 1) {
      const link = links.nth(index);
      const url = new URL(String(await link.getAttribute("href")));
      expect(url.protocol).toBe("https:");
      expect(url.searchParams.get("query")).toBe("SR Conventions Gachibowli");
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
  });
});
