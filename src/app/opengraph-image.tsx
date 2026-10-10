import { ImageResponse } from "next/og";

export const alt = "Shivanshu Aryan: Robotics, Game Theory, Systems, Quant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OBSIDIAN = "#05070a";
const HAIRLINE = "rgba(255,255,255,0.07)";
const HAIRLINE_2 = "rgba(255,255,255,0.16)";
const CHROME = "#f1f3f5";
const STEEL = "#9aa3ad";
const EMBER = "#ff6a2b";

// Corner tick mark, matching the site's .ticks frames.
function Tick({ top, left }: { top: boolean; left: boolean }) {
  const pos: Record<string, number> = {};
  pos[top ? "top" : "bottom"] = 40;
  pos[left ? "left" : "right"] = 40;
  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        width: 18,
        height: 18,
        display: "flex",
        borderColor: HAIRLINE_2,
        borderStyle: "solid",
        borderTopWidth: top ? 1 : 0,
        borderBottomWidth: top ? 0 : 1,
        borderLeftWidth: left ? 1 : 0,
        borderRightWidth: left ? 0 : 1,
      }}
    />
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 96px",
          backgroundColor: OBSIDIAN,
          backgroundImage: `radial-gradient(60% 70% at 78% 0%, rgba(160,180,205,0.16), transparent 70%), linear-gradient(${HAIRLINE} 1px, transparent 1px), linear-gradient(90deg, ${HAIRLINE} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <Tick top left />
        <Tick top left={false} />
        <Tick top={false} left />
        <Tick top={false} left={false} />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: CHROME, letterSpacing: -0.5 }}>
            zero
          </div>
          <div style={{ display: "flex", width: 1, height: 34, backgroundColor: HAIRLINE_2 }} />
          <div
            style={{
              display: "flex",
              fontSize: 15,
              fontWeight: 500,
              color: STEEL,
              letterSpacing: 3.5,
              textTransform: "uppercase",
            }}
          >
            CS undergraduate, IIT Delhi
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 300,
              color: CHROME,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Shivanshu Aryan
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontSize: 96,
              fontWeight: 300,
              color: STEEL,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Build it, then prove it.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 44 }}>
            <div style={{ display: "flex", width: 8, height: 8, borderRadius: 8, backgroundColor: EMBER }} />
            <div style={{ display: "flex", fontSize: 26, color: STEEL }}>
              Robotics, game theory, systems, quant
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 10, marginLeft: 24, fontSize: 22, color: STEEL }}>
            Incoming intern, Peak XV Partners
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
