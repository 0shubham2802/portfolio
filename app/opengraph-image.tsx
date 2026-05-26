import { ImageResponse } from "next/og";

export const alt = "Shubham Pant — Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0C14",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#8B8F9C",
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          <span>[ SP ]</span>
          <span style={{ color: "#3D7BFF" }}>{"> BACKEND_ENGINEER.JAVA"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 124,
              fontWeight: 600,
              color: "#F4F2EC",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Shubham Pant<span style={{ color: "#3D7BFF" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              color: "#C4C2BC",
              maxWidth: 900,
            }}
          >
            Distributed systems in Java &amp; Spring Boot.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#8B8F9C",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#6DDB9C",
            }}
          />
          <span>AVAILABLE FOR BACKEND ROLES</span>
          <span style={{ color: "#5A5F70" }}>·</span>
          <span>MUMBAI, IN</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
