import { expect, test } from "@playwright/test";

test.describe("Enquiry form tests", () => {
  test("constructs encoded WhatsApp URL without navigation", async ({ page }) => {
    await page.addInitScript(() => {
      window.open = (...args: unknown[]) => {
        (window as typeof window & { __openArgs?: unknown[] }).__openArgs = args;
        return null;
      };
    });
    await page.goto("/");

    await page.locator('input[name="name"]').fill("Asha Rao");
    await page.locator('select[name="occasion"]').selectOption({ label: "Family occasion" });
    await page.locator('input[name="date"]').fill("2026-11-14");
    await page.locator('textarea[name="message"]').fill("Is the venue available?");
    await page.locator("[data-enquiry-form]").getByRole("button").click();

    const args = await page.evaluate(
      () => (window as typeof window & { __openArgs?: unknown[] }).__openArgs
    );
    const url = new URL(String(args?.[0]));
    expect(url.protocol).toBe("https:");
    expect(url.host).toBe("wa.me");
    expect(url.pathname).toBe("/919999999999");
    expect(url.searchParams.get("text")).toContain("Asha Rao");
    expect(url.searchParams.get("text")).toContain("Family occasion");
    expect(url.searchParams.get("text")).toContain("2026-11-14");
    expect(url.searchParams.get("text")).toContain("Is the venue available?");
    expect(args?.[1]).toBe("_blank");
    await expect(page).toHaveURL("/");
  });
});
