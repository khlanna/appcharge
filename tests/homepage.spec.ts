import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage successfully", async ({ page }) => {
    // Check page loads
    await expect(page).toHaveTitle(/Mini Storefront/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("should display page structure correctly", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check basic page structure
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("main .grid").first()).toBeVisible();
  });

  test("should display products grid", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check that products are displayed - use the correct selector
    const productCards = page.locator(".grid").first().locator("> div");
    const productCount = await productCards.count();

    // Should have products
    expect(productCount).toBeGreaterThan(0);
    console.log(`Found ${productCount} products on the homepage`);
  });

  test("should display correct number of products", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Get the product count from the header first
    const productCountText = page.locator("text=/products available/");
    await expect(productCountText).toBeVisible();
    const countText = await productCountText.textContent();
    const expectedCount = parseInt(countText?.match(/\d+/)?.[0] || "0");

    // Use the first grid element which contains the products
    const productCards = page.locator(".grid").first().locator("> div");
    const actualProductCount = await productCards.count();

    // Should have the same number of products as shown in the header
    expect(actualProductCount).toBe(expectedCount);
    console.log(
      `Found ${actualProductCount} products on the homepage (expected: ${expectedCount})`
    );
  });

  test("should navigate to product details", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Get the first product card and click the "View Details" button inside it
    const firstProductCard = page
      .locator(".grid")
      .first()
      .locator("> div")
      .first();
    await expect(firstProductCard).toBeVisible();

    // Click on the "View Details" button inside the card
    const viewDetailsButton = firstProductCard.locator(
      'a[href*="/products/"], button:has-text("View Details")'
    );
    await expect(viewDetailsButton).toBeVisible();
    await viewDetailsButton.click();

    // Verify navigation to product details page
    await expect(page).toHaveURL(/\/products\/\d+/);
    await expect(page.locator("main")).toBeVisible();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Intercept API calls and return error
    await page.route("**/products", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    // Navigate to homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check that page still loads and has content
    await expect(page.locator("body")).toBeVisible();
    const pageContent = page.locator("body");
    await expect(pageContent).toBeVisible();

    // The homepage should still load even with API error
    // It will show "0 products available" in the header
    const productCountText = page.locator("text=/products available/");
    await expect(productCountText).toBeVisible();

    const countText = await productCountText.textContent();
    const displayedCount = parseInt(countText?.match(/\d+/)?.[0] || "0");

    // Should show products (SSG pre-rendered at build time)
    expect(displayedCount).toBeGreaterThan(0);

    // Page should still have content
    const pageText = await pageContent.textContent();
    expect(pageText?.length).toBeGreaterThan(0);
  });

  test("should handle slow API responses gracefully", async ({ page }) => {
    // Intercept API calls and add delay
    await page.route("**/products", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    // Navigate to homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check that page still loads and has content
    await expect(page.locator("body")).toBeVisible();
    const pageContent = page.locator("body");
    await expect(pageContent).toBeVisible();

    const pageText = await pageContent.textContent();
    expect(pageText?.length).toBeGreaterThan(0);
  });

  test("should have proper page metadata", async ({ page }) => {
    // Check meta tags exist (not visibility)
    await expect(
      page.locator('meta[name="description"]').first()
    ).toHaveAttribute("content");
    await expect(page.locator('meta[name="viewport"]').first()).toHaveAttribute(
      "content"
    );
  });

  test("should load homepage within performance budget", async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Performance budget: homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    console.log(`Homepage loaded in ${loadTime}ms`);

    // Check that page is interactive
    await expect(page.locator("main")).toBeVisible();
  });

  test("should have proper accessibility features", async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator("h1")).toBeVisible();

    // Check for images with alt text (if any)
    const images = page.locator("img");
    const imageCount = await images.count();
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt).toBeTruthy();
      }
    }

    // Check for links with text content (if any)
    const links = page.locator("a");
    const linkCount = await links.count();
    if (linkCount > 0) {
      for (let i = 0; i < linkCount; i++) {
        const text = await links.nth(i).textContent();
        expect(text?.trim()).toBeTruthy();
      }
    }
  });
});
