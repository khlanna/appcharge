import { test, expect } from "@playwright/test";

test.describe("Product Details Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a product details page
    await page.goto("/products/1");
  });

  test("should load product details page successfully", async ({ page }) => {
    // Check page loads
    await expect(page).toHaveTitle(/Mini Storefront/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Intercept API calls and return error
    await page.route("**/products/*", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    // Navigate to product details page
    await page.goto("/products/1");
    await page.waitForLoadState("networkidle");

    // Check that page still loads and has content
    await expect(page.locator("body")).toBeVisible();
    const pageContent = page.locator("body");
    await expect(pageContent).toBeVisible();

    const pageText = await pageContent.textContent();
    expect(pageText?.length).toBeGreaterThan(0);
  });

  test("should show 404 when product API fails", async ({ page }) => {
    // Intercept API calls and return error
    await page.route("**/products/*", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    // Navigate to product details page
    await page.goto("/products/1");
    await page.waitForLoadState("networkidle");

    // Should show 404 page when product API fails
    // This is the actual behavior - product details page returns notFound: true
    await expect(page.locator("body")).toBeVisible();

    // Check if it's a 404 page (Next.js default 404)
    const is404Page =
      (await page
        .locator("text=/404/i, text=/not found/i, text=/page not found/i")
        .count()) > 0;
    expect(is404Page).toBe(true);
  });

  test("should handle slow API responses gracefully", async ({ page }) => {
    // Intercept API calls and add delay
    await page.route("**/products/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          title: "Test Product",
          price: 29.99,
          description: "Test description",
          category: "test",
          image: "test.jpg",
          rating: { rate: 4.5, count: 100 },
        }),
      });
    });

    // Navigate to product details page
    await page.goto("/products/1");
    await page.waitForLoadState("networkidle");

    // Check that page still loads and has content
    await expect(page.locator("body")).toBeVisible();
    const pageContent = page.locator("body");
    await expect(pageContent).toBeVisible();

    const pageText = await pageContent.textContent();
    expect(pageText?.length).toBeGreaterThan(0);
  });

  test("should handle 404 for invalid product ID", async ({ page }) => {
    // Navigate to a non-existent product
    await page.goto("/products/999999");
    await page.waitForLoadState("networkidle");

    // Should show 404 or error page
    await expect(page.locator("body")).toBeVisible();
    const pageContent = page.locator("body");
    await expect(pageContent).toBeVisible();

    const pageText = await pageContent.textContent();
    expect(pageText?.length).toBeGreaterThan(0);
  });

  test("should have proper accessibility features", async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator("h1, h2").first()).toBeVisible();

    // Check for images with alt text (if any)
    const images = page.locator("img");
    const imageCount = await images.count();
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt).toBeTruthy();
      }
    }

    // Check for buttons with proper text or aria-label (if any)
    const buttons = page.locator("button");
    const buttonCount = await buttons.count();
    if (buttonCount > 0) {
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute("aria-label");

        // Button should have either text content or aria-label
        expect(text?.trim() || ariaLabel).toBeTruthy();
      }
    }
  });

  test("should allow navigation back to homepage", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Look for navigation back to homepage
    const homeLink = page.locator('a[href="/"], a[href="/index"]');
    if ((await homeLink.count()) > 0) {
      await expect(homeLink.first()).toBeVisible();

      // Click the home link
      await homeLink.first().click();

      // Verify we're back on the homepage
      await expect(page).toHaveURL(/\/$|\/index$/);
    }
  });

  test("should display product metadata correctly", async ({ page }) => {
    // Check meta tags exist (not visibility)
    await expect(
      page.locator('meta[name="description"]').first()
    ).toHaveAttribute("content");
    await expect(page.locator('meta[name="viewport"]').first()).toHaveAttribute(
      "content"
    );
  });

  test("should load product details within performance budget", async ({
    page,
  }) => {
    // Start performance measurement
    const startTime = Date.now();

    await page.goto("/products/1");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Performance budget: product details should load within 2.5 seconds
    expect(loadTime).toBeLessThan(2500);
    console.log(`Product details page loaded in ${loadTime}ms`);

    // Check that page is interactive
    await expect(page.locator("main")).toBeVisible();
  });
});
