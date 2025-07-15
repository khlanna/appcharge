import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Product } from "@/types/product";
import { getAllProducts, getProductById } from "@/lib/api";
import ProductDetail from "@/components/ProductDetail";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  // Show loading state while page is being generated
  if (router.isFallback) {
    return <ProductDetailSkeleton />;
  }

  return (
    <>
      <Head>
        <title>{product.title} - Mini Storefront</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:image"
          content={`${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/og?title=${encodeURIComponent(product.title)}&price=${
            product.price
          }&image=${encodeURIComponent(product.image)}`}
        />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description} />
        <meta
          name="twitter:image"
          content={`${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/og?title=${encodeURIComponent(product.title)}&price=${
            product.price
          }&image=${encodeURIComponent(product.image)}`}
        />
      </Head>

      <ProductDetail product={product} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await getAllProducts();
    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking", // Generate pages on-demand if not pre-rendered
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
  params,
}) => {
  try {
    const id = params?.id as string;
    const product = await getProductById(id);

    return {
      props: {
        product,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error(`Error fetching product ${params?.id}:`, error);
    return {
      notFound: true, // This will show the 404 page
    };
  }
};
