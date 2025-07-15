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
    expect(screen.getByText("Product Details")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /copy product link/i })
    ).toBeInTheDocument();
  });
});
