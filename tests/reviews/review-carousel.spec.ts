import { expect, test } from "@playwright/test";

test.describe("Google review carousel", () => {
  test("shows 12 attributed review excerpts and navigates them", async ({ page }) => {
    await page.goto("/");

    const cards = page.locator(".review-card");
    await expect(cards).toHaveCount(12);
    await expect(page.locator("[data-review-position]")).toHaveText("1");
    await expect(page.locator("[data-review-previous]")).toBeDisabled();
    await expect(page.locator("[data-review-next]")).toBeEnabled();

    for (let index = 0; index < 12; index += 1) {
      await expect(cards.nth(index).locator("blockquote")).not.toBeEmpty();
      await expect(cards.nth(index).locator(".reviewer strong")).not.toBeEmpty();
      await expect(cards.nth(index).locator(".review-card-top")).toContainText("★★★★★");
    }

    await page.locator("[data-review-next]").click();
    await expect(page.locator("[data-review-position]")).toHaveText("2");

    await page.locator("[data-review-track]").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("[data-review-position]")).toHaveText("3");

    const allReviews = page.getByRole("link", { name: /read all 726 reviews/i });
    await expect(allReviews).toHaveAttribute("target", "_blank");
    await expect(allReviews).toHaveAttribute("rel", /noreferrer/);
  });
});
