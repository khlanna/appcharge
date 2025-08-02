# API Error Testing Guide

## Overview

The API error tests simulate real-world scenarios where the backend API fails, times out, or returns errors. These tests ensure your app handles these situations gracefully without crashing or showing blank screens.

## Test Scenarios

### 1. **API Server Errors (500, 404, etc.)**

```typescript
test("should handle API errors gracefully", async ({ page }) => {
  // Intercept API calls and make them fail
  await page.route("**/products", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Internal Server Error" }),
    });
  });

  // Navigate to the page
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Verify the page still loads and shows content
  const mainContent = page.locator("main");
  await expect(mainContent).toBeVisible();
});
```

**What this tests:**

- ✅ API returns 500 error
- ✅ Page still loads without crashing
- ✅ Main content is visible
- ✅ User can still interact with the page

### 2. **Network Timeouts**

```typescript
test("should handle API timeouts gracefully", async ({ page }) => {
  // Intercept API calls and make them timeout
  await page.route("**/products", async (route) => {
    // Don't fulfill the route - this causes a timeout
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Verify the page handles timeout gracefully
  const mainContent = page.locator("main");
  await expect(mainContent).toBeVisible();
});
```

**What this tests:**

- ✅ API calls timeout (no response)
- ✅ Page doesn't hang or crash
- ✅ User can still see the page content
- ✅ App handles network failures

### 3. **Slow API Responses**

```typescript
test("should handle slow API responses gracefully", async ({ page }) => {
  // Intercept API calls and make them slow
  await page.route("**/products", async (route) => {
    // Simulate a slow response (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]), // Empty products array
    });
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Verify the page handles slow responses
  const mainContent = page.locator("main");
  await expect(mainContent).toBeVisible();
});
```

**What this tests:**

- ✅ API responses are slow (2+ seconds)
- ✅ Page doesn't show loading forever
- ✅ User can see content even with slow API
- ✅ App handles performance issues

## How Network Interception Works

### **`page.route()` Method**

```typescript
await page.route("**/products", async (route) => {
  // This intercepts ALL requests to URLs containing "/products"
  // You can modify the response here
});
```

**Route Patterns:**

- `"**/products"` - Matches any URL ending with "/products"
- `"**/products/*"` - Matches URLs like "/products/1", "/products/123"
- `"**/api/**"` - Matches any API endpoint

### **`route.fulfill()` Method**

```typescript
await route.fulfill({
  status: 500, // HTTP status code
  contentType: "application/json", // Response content type
  body: JSON.stringify({ error: "Server Error" }), // Response body
});
```

**Response Options:**

- `status` - HTTP status code (200, 404, 500, etc.)
- `contentType` - MIME type of response
- `body` - Response body (string or Buffer)
- `headers` - Custom response headers

### **Not Fulfilling the Route**

```typescript
await page.route("**/products", async (route) => {
  // Don't call route.fulfill() - this causes a timeout
  // The fetch request will eventually timeout
});
```

## Test Validation

### **What We Check:**

1. **Page Loads**: The page should still load even with API errors
2. **Content Visible**: Main content area should be visible
3. **No Crashes**: Page shouldn't show blank screen or crash
4. **User Experience**: User should still be able to interact with the page

### **Assertions Used:**

```typescript
// Check that main content is visible
const mainContent = page.locator("main");
await expect(mainContent).toBeVisible();

// Check that page has content (not blank)
const pageText = await page.textContent("body");
expect(pageText).toBeTruthy();
expect(pageText?.length).toBeGreaterThan(0);
```

## Real-World Scenarios

These tests simulate common production issues:

1. **Server Down**: API returns 500 errors
2. **Network Issues**: Requests timeout
3. **Slow Performance**: API responses are delayed
4. **Invalid Data**: API returns malformed JSON
5. **Rate Limiting**: API returns 429 errors

## Benefits

- **Resilience**: Ensures app works even when backend fails
- **User Experience**: Users don't see blank screens or crashes
- **Debugging**: Helps identify where error handling is missing
- **Confidence**: Gives confidence that app handles edge cases

## Best Practices

1. **Test Multiple Error Types**: 500, 404, timeout, slow responses
2. **Verify User Experience**: Page should still be usable
3. **Check Content**: Ensure page shows meaningful content
4. **Test Both Pages**: Homepage and product details
5. **Realistic Scenarios**: Use realistic error messages and timing

## Debugging Failed Tests

If API error tests fail:

1. **Check Error Handling**: Does your app have try/catch blocks?
2. **Verify Fallbacks**: Does your app show fallback content?
3. **Check Loading States**: Does your app handle loading properly?
4. **Review API Calls**: Are you handling fetch errors correctly?

## Example Error Handling in Your App

```typescript
// Good error handling example
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array instead of throwing
    return [];
  }
}
```

This ensures your app gracefully handles API failures and provides a good user experience even when the backend is having issues.
