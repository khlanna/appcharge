import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const price = searchParams.get("price");
    const image = "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg";
    // "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"; //searchParams.get("image");
    console.log({ imiage: searchParams.get("image") });
    if (!title) {
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3f4f6",
              padding: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                color: "#1f2937",
                marginBottom: "20px",
              }}
            >
              Mini Storefront
            </h1>
            <p style={{ fontSize: "24px", color: "#6b7280" }}>
              Product not found
            </p>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#ffffff",
            padding: "40px",
          }}
        >
          {/* Left side - Product image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              paddingRight: "40px",
            }}
          >
            {image && (
              <img
                src={image}
                alt={title}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              />
            )}
          </div>

          {/* Right side - Product info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              paddingLeft: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h1>

            {price && (
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#059669",
                  marginBottom: "20px",
                }}
              >
                ${price}
              </div>
            )}

            <div
              style={{
                fontSize: "24px",
                color: "#6b7280",
                marginBottom: "30px",
              }}
            >
              Mini Storefront
            </div>

            <div
              style={{
                fontSize: "20px",
                color: "#059669",
                fontWeight: "bold",
              }}
            >
              Shop Now →
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.log(errorMessage);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
