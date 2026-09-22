import { expect, test } from "@playwright/test";

test.describe("Content transparency tests", () => {
  test("labels demo content and form controls", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("note")).toContainText("Pitch demo");
    await expect(page.getByText("Representative placeholder image").first()).toBeVisible();
    await expect(page.locator(".form-note")).toContainText("placeholder WhatsApp number");

    const controls = page.locator(".enquiry-form input, .enquiry-form select, .enquiry-form textarea");
    for (let index = 0; index < (await controls.count()); index += 1) {
      const labelText = await controls.nth(index).evaluate((control) =>
        control.closest("label")?.childNodes[0]?.textContent?.trim()
      );
      expect(labelText).toBeTruthy();
    }
  });
});
