import { renderHook, act } from "@testing-library/react";
import { useCartStore } from "./cart-store";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Test data
const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

const mockProduct2 = {
  id: 2,
  title: "Another Product",
  price: 19.99,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

describe("Cart Store", () => {
  beforeEach(() => {
    // Clear store before each test
    useCartStore.getState().clearCart();
    // Clear localStorage mock
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe("Initial State", () => {
    test("should start with empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.items).toEqual([]);
      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });

    test("should have correct initial values", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.isOpen).toBe(false);
      expect(result.current.items).toEqual([]);
    });
  });

  describe("Add Item Tests", () => {
    test("should add item to empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...mockProduct,
        quantity: 1,
      });
      expect(result.current.getTotalItems()).toBe(1);
      expect(result.current.getTotalPrice()).toBe(29.99);
    });

    test("should increment quantity for duplicate items", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.getTotalItems()).toBe(2);
      expect(result.current.getTotalPrice()).toBe(59.98);
    });

    test("should handle multiple different items", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.getTotalItems()).toBe(2);
      expect(result.current.getTotalPrice()).toBe(49.98);
    });
  });

  describe("Remove Item Tests", () => {
    test("should remove existing item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.removeItem(mockProduct.id);
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });

    test("should handle removing non-existent item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.removeItem(999); // Non-existent ID
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.getTotalItems()).toBe(1);
    });
  });

  describe("Quantity Management Tests", () => {
    test("should increment quantity of existing item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.incrementQuantity(mockProduct.id);
      });

      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.getTotalItems()).toBe(2);
    });

    test("should decrement quantity of item with qty > 1", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct); // Now quantity = 2
        result.current.decrementQuantity(mockProduct.id);
      });

      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.getTotalItems()).toBe(1);
    });

    test("should remove item when quantity reaches 0", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.decrementQuantity(mockProduct.id);
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalItems()).toBe(0);
    });

    test("should handle incrementing non-existent item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.incrementQuantity(999);
      });

      expect(result.current.items).toHaveLength(0);
    });

    test("should handle decrementing non-existent item", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.decrementQuantity(999);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe("Cart Management Tests", () => {
    test("should clear cart with items", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct2);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });

    test("should handle clearing empty cart", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalItems()).toBe(0);
    });
  });

  describe("Calculation Tests", () => {
    test("should calculate total items correctly", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct);
        result.current.addItem(mockProduct); // Quantity = 2
        result.current.addItem(mockProduct2); // Quantity = 1
      });

      expect(result.current.getTotalItems()).toBe(3);
    });

    test("should calculate total price correctly", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct); // 29.99
        result.current.addItem(mockProduct2); // 19.99
      });

      expect(result.current.getTotalPrice()).toBe(49.98);
    });

    test("should handle zero calculations", () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotalItems()).toBe(0);
      expect(result.current.getTotalPrice()).toBe(0);
    });
  });

  describe("Cart Open/Close Tests", () => {
    test("should open cart", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setIsOpen(true);
      });

      expect(result.current.isOpen).toBe(true);
    });

    test("should close cart", () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setIsOpen(true);
        result.current.setIsOpen(false);
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});
