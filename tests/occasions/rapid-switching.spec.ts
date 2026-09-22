import { expect, test } from "@playwright/test";

test.describe("Occasion selector tests", () => {
  test("settles after rapid occasion changes", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto("/");
    for (const key of ["wedding", "reception", "family", "corporate"]) {
      await page.locator(`[data-occasion="${key}"]`).click();
    }

    await expect(page.locator('[data-occasion="corporate"]')).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("[data-scene-title]")).toHaveText(
      "A polished setting for shared purpose."
    );
    expect(errors).toEqual([]);
  });
});
