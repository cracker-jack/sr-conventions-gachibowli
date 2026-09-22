import { expect, test } from "@playwright/test";

test.describe("Enquiry form tests", () => {
  test("builds an enquiry from valid details", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "open", {
        configurable: true,
        value: (...args: unknown[]) => {
          (window as typeof window & { __openArgs?: unknown[] }).__openArgs = args;
          return null;
        },
      });
    });
    await page.goto("/");

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('select[name="occasion"]').selectOption({ label: "Wedding" });
    await page.locator('input[name="date"]').fill("2026-12-25");
    await page.locator('textarea[name="message"]').fill("Please share visit timings.");
    await page.locator("[data-enquiry-form]").getByRole("button").click();

    const args = await page.evaluate(
      () => (window as typeof window & { __openArgs?: unknown[] }).__openArgs
    );
    expect(args).toBeTruthy();
    const url = new URL(String(args?.[0]));
    expect(`${url.origin}${url.pathname}`).toBe("https://wa.me/919999999999");
    expect(url.searchParams.get("text")).toContain("Test User");
    expect(url.searchParams.get("text")).toContain("Wedding");
  });
});
