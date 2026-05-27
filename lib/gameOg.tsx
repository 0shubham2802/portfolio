import { ImageResponse } from "next/og";

export function renderGameOg(title: string, tagline: string) {
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
          <span style={{ color: "#3D7BFF" }}>{"> ARCADE"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 600,
              color: "#F4F2EC",
              letterSpacing: -1,
            }}
          >
            {title}
            <span style={{ color: "#3D7BFF" }}>.EXE</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              color: "#C4C2BC",
              maxWidth: 1000,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#8B8F9C",
            fontSize: 22,
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
          <span>PLAY · SHUBHAMPANT.DEV/PLAY</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
