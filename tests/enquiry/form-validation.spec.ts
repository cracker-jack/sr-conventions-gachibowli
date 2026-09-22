import { expect, test } from "@playwright/test";

test.describe("Enquiry form tests", () => {
  test("blocks missing required enquiry details", async ({ page }) => {
    await page.addInitScript(() => {
      (window as typeof window & { __openCount?: number }).__openCount = 0;
      window.open = () => {
        (window as typeof window & { __openCount?: number }).__openCount += 1;
        return null;
      };
    });
    await page.goto("/");

    const form = page.locator("[data-enquiry-form]");
    await page.locator('select[name="occasion"]').selectOption({ label: "Reception" });
    await form.getByRole("button").click();
    await expect(page.locator('input[name="name"]')).toHaveJSProperty("validity.valueMissing", true);

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('select[name="occasion"]').selectOption("");
    await form.getByRole("button").click();
    await expect(page.locator('select[name="occasion"]')).toHaveJSProperty(
      "validity.valueMissing",
      true
    );

    expect(
      await page.evaluate(
        () => (window as typeof window & { __openCount?: number }).__openCount
      )
    ).toBe(0);
  });
});
