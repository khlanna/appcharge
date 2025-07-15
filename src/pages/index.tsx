import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/api";
import HomePage from "@/components/HomePage";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Mini Storefront - Products</title>
        <meta
          name="description"
          content="Browse our collection of amazing products"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Mini Storefront - Products" />
        <meta
          property="og:description"
          content="Browse our collection of amazing products"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Mini Storefront - Products`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mini Storefront - Products" />
        <meta
          name="twitter:description"
          content="Browse our collection of amazing products"
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=Mini Storefront - Products`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage products={products} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const products = await getAllProducts();
    return {
      props: {
        products,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
      revalidate: 60, // Retry in 1 minute if there's an error
    };
  }
};
