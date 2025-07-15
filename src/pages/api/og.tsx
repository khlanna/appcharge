import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req: NextRequest) {
  const image = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"; // Known public image

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <img
          src={image}
          width={400}
          height={400}
          style={{ objectFit: "cover", borderRadius: 16 }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
