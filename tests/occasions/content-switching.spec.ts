import { expect, test } from "@playwright/test";

const occasions = [
  ["wedding", "Scene 01", "A day that feels entirely yours."],
  ["reception", "Scene 02", "The evening everyone comes together."],
  ["family", "Scene 03", "Milestones deserve a room of their own."],
  ["corporate", "Scene 04", "A polished setting for shared purpose."],
] as const;

test.describe("Occasion selector tests", () => {
  test("switches occasion content", async ({ page }) => {
    await page.goto("/");

    for (const [key, scene, title] of occasions) {
      const button = page.locator(`[data-occasion="${key}"]`);
      await button.focus();
      await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("aria-selected", "true");
      await expect(page.locator("[data-scene-number]")).toHaveText(scene);
      await expect(page.locator("[data-scene-title]")).toHaveText(title);
    }
  });
});
