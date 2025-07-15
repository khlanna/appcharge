import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - Mini Storefront</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
