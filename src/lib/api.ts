import { Product } from "@/types/product";

const BASE_URL = process.env.API_BASE_URL || "https://fakestoreapi.com";

// Simple in-memory cache for build-time optimization
const cache = new Map<string, unknown>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for better caching

export async function getAllProducts(): Promise<Product[]> {
  const cacheKey = "all-products";
  const cached = cache.get(cacheKey) as
    | { data: Product[]; timestamp: number }
    | undefined;

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Cache the result
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  const cacheKey = `product-${id}`;
  const cached = cache.get(cacheKey) as
    | { data: Product; timestamp: number }
    | undefined;

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Cache the result
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}
