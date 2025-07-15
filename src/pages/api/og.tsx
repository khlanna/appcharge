import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = { runtime: "edge" };

export default async function handler(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f00",
          color: "#fff",
          fontSize: 64,
        }}
      >
        TEST
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
