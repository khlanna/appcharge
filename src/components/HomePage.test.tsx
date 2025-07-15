import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { Product } from "@/types/product";

describe("HomePage", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Test Product 1",
      price: 19.99,
      description: "Description 1",
      category: "Category 1",
      image: "https://example.com/image1.jpg",
      rating: { rate: 4.2, count: 5 },
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 29.99,
      description: "Description 2",
      category: "Category 2",
      image: "https://example.com/image2.jpg",
      rating: { rate: 3.8, count: 8 },
    },
  ];

  it("renders homepage with products", () => {
    render(<HomePage products={mockProducts} />);
    expect(screen.getByText("Mini Storefront")).toBeInTheDocument();
    expect(screen.getByText("2 products available")).toBeInTheDocument();
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(
        screen.getByText(`$${product.price.toFixed(2)}`)
      ).toBeInTheDocument();
    });
    expect(screen.getAllByRole("link", { name: /view details/i })).toHaveLength(
      mockProducts.length
    );
  });
});
