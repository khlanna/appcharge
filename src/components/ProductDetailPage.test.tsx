import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetailPage from "./ProductDetailPage";
import { Product } from "@/types/product";

describe("ProductDetailPage", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    description: "This is a test product description.",
    category: "Test Category",
    image: "https://example.com/image.jpg",
    rating: {
      rate: 4.5,
      count: 10,
    },
  };

  it("renders product details", () => {
    render(<ProductDetailPage product={mockProduct} />);

    // Check that the product title is rendered in the header (h1)
    expect(
      screen.getByRole("heading", { level: 1, name: mockProduct.title })
    ).toBeInTheDocument();

    // Check that the category is displayed
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();

    // Check that the price is displayed
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();

    // Check that the description is displayed
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Check that the "Add to Cart" button is present
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();

    // Check that the "Continue Shopping" link is present
    expect(
      screen.getByRole("link", { name: /continue shopping/i })
    ).toBeInTheDocument();

    // Check that the "Back to Products" link is present
    expect(
      screen.getByRole("link", { name: /back to products/i })
    ).toBeInTheDocument();
  });
});
