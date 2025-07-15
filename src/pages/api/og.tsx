import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req: NextRequest) {
  // Use a Wikimedia Commons image that is public and hotlink-friendly
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png";

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
