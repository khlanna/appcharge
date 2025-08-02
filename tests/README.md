# End-to-End Tests

This directory contains end-to-end tests for the Mini Storefront application using Playwright.

## Test Files

### `homepage.spec.ts`

Tests the main homepage functionality:

- ✅ Page loading and title verification
- ✅ Product grid display
- ✅ Product information display (image, title, price, category, rating)
- ✅ Navigation to product details
- ✅ Product count in header
- ✅ Responsive design testing
- ✅ Loading state handling
- ✅ Accessibility features

### `product-details.spec.ts`

Tests the product details page:

- ✅ Page loading and URL verification
- ✅ Product information display
- ✅ Rating and reviews display
- ✅ Product action buttons
- ✅ Responsive design testing
- ✅ 404 handling for invalid products
- ✅ Accessibility features
- ✅ Navigation back to homepage
- ✅ Meta tags and SEO

## Running the Tests

### Prerequisites

Make sure you have all dependencies installed:

```bash
npm install
```

### Run all tests

```bash
npm run test:e2e
```

### Run specific test file

```bash
npx playwright test homepage.spec.ts
npx playwright test product-details.spec.ts
```

### Run tests in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

### Run tests with specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Structure Explanation

### Test Organization

Each test file uses `test.describe()` to group related tests together. This makes it easier to organize and understand what functionality is being tested.

### beforeEach Hook

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});
```

This runs before each test in the describe block, ensuring each test starts with a clean state by navigating to the homepage.

### Page Object Model

The tests use Playwright's locator API to find elements:

- `page.locator('selector')` - finds elements by CSS selector
- `page.locator('text=text')` - finds elements by text content
- `page.locator('[class*="card"]')` - finds elements with class containing "card"

### Assertions

Tests use Playwright's expect API:

- `await expect(element).toBeVisible()` - checks if element is visible
- `await expect(element).toHaveText('text')` - checks element text
- `await expect(page).toHaveURL('/expected-url')` - checks current URL

### Waiting Strategies

```typescript
await page.waitForLoadState("networkidle");
```

This waits until the network is idle, ensuring all API calls and resources are loaded before proceeding with the test.

## Key Testing Concepts

### 1. **Element Locators**

```typescript
// Find by CSS selector
const header = page.locator("header");

// Find by text content
const heading = page.locator("text=Mini Storefront");

// Find by attribute
const images = page.locator("img[alt]");

// Find by class containing text
const cards = page.locator('[class*="card"]');
```

### 2. **Assertions**

```typescript
// Check visibility
await expect(element).toBeVisible();

// Check text content
await expect(element).toHaveText("Expected Text");

// Check URL
await expect(page).toHaveURL("/expected-path");

// Check count
expect(await elements.count()).toBeGreaterThan(0);
```

### 3. **User Interactions**

```typescript
// Click an element
await button.click();

// Navigate to URL
await page.goto("/products/1");

// Set viewport size for responsive testing
await page.setViewportSize({ width: 375, height: 667 });
```

### 4. **Waiting for Elements**

```typescript
// Wait for network to be idle
await page.waitForLoadState("networkidle");

// Wait for specific element
await expect(element).toBeVisible();
```

## Best Practices

1. **Use descriptive test names** that explain what functionality is being tested
2. **Group related tests** using `test.describe()`
3. **Use beforeEach** to set up common test state
4. **Wait for network idle** before making assertions
5. **Test both happy path and error scenarios**
6. **Include accessibility testing** in your E2E tests
7. **Test responsive behavior** on different screen sizes
8. **Use data-testid attributes** for more reliable element selection

## Debugging Tests

If a test fails, you can:

1. **Run in debug mode**:

   ```bash
   npx playwright test --debug
   ```

2. **Run in headed mode** to see the browser:

   ```bash
   npx playwright test --headed
   ```

3. **Use Playwright Inspector**:

   ```bash
   npx playwright test --ui
   ```

4. **Add screenshots on failure** by adding to your config:
   ```typescript
   use: {
     screenshot: 'only-on-failure',
   }
   ```
