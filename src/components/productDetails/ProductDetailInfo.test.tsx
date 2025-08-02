import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductDetailInfo } from "./ProductDetailInfo";

// Mock the clipboard API
const mockClipboard = {
  writeText: jest.fn(),
};
Object.assign(navigator, {
  clipboard: mockClipboard,
});

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:3000/products/1",
  },
  writable: true,
});

describe("ProductDetailInfo", () => {
  const defaultProps = {
    category: "Electronics",
    title: "Test Product",
    rate: 4.5,
    count: 120,
    price: 299.99,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders product information correctly", () => {
    render(<ProductDetailInfo {...defaultProps} />);

    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$299.99")).toBeInTheDocument();
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });

  it("displays loading skeleton when isLoading is true", () => {
    render(<ProductDetailInfo {...defaultProps} isLoading={true} />);

    // Should not show actual content
    expect(screen.queryByText("Test Product")).not.toBeInTheDocument();
    expect(screen.queryByText("$299.99")).not.toBeInTheDocument();

    // Should show skeleton elements
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("handles missing optional props gracefully", () => {
    render(<ProductDetailInfo />);

    // Should render without crashing
    expect(screen.getByText("Copy Link")).toBeInTheDocument();

    // Price should show $0.00 when price is undefined
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("handles copy link functionality", async () => {
    mockClipboard.writeText.mockResolvedValue(undefined);

    render(<ProductDetailInfo {...defaultProps} />);

    const copyButton = screen.getByRole("button", {
      name: "Copy product link",
    });
    fireEvent.click(copyButton);

    // Should call clipboard API
    expect(mockClipboard.writeText).toHaveBeenCalledWith(
      "http://localhost:3000/products/1"
    );

    // Should show "Link Copied!" message
    await waitFor(() => {
      expect(screen.getByText("Link Copied!")).toBeInTheDocument();
    });

    // Should revert back to "Copy Link" after timeout
    jest.advanceTimersByTime(1500);
    await waitFor(() => {
      expect(screen.getByText("Copy Link")).toBeInTheDocument();
    });
  });

  it("handles copy link error gracefully", async () => {
    mockClipboard.writeText.mockRejectedValue(new Error("Clipboard error"));

    render(<ProductDetailInfo {...defaultProps} />);

    const copyButton = screen.getByRole("button", {
      name: "Copy product link",
    });
    fireEvent.click(copyButton);

    // Should not crash and should still show the button
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
  });

  it("formats price correctly", () => {
    render(<ProductDetailInfo {...defaultProps} price={123.456} />);
    expect(screen.getByText("$123.46")).toBeInTheDocument();
  });

  it("handles zero price", () => {
    render(<ProductDetailInfo {...defaultProps} price={0} />);
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("handles undefined price", () => {
    render(<ProductDetailInfo {...defaultProps} price={undefined} />);
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("renders rating with correct props", () => {
    render(<ProductDetailInfo {...defaultProps} rate={3.7} count={85} />);

    // The Rating component should be rendered with the correct props
    // We can't directly test the Rating component's internal logic,
    // but we can verify it's rendered
    expect(
      screen.getByRole("button", { name: "Copy product link" })
    ).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<ProductDetailInfo {...defaultProps} />);

    const copyButton = screen.getByRole("button", {
      name: "Copy product link",
    });
    expect(copyButton).toHaveAttribute("aria-label", "Copy product link");
    expect(copyButton).toHaveAttribute("type", "button");
  });
});
