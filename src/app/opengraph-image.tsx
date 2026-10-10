import { ImageResponse } from "next/og";

export const alt = "Shivanshu Aryan: Robotics, Game Theory, Systems, Quant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#080b10";
const HULL = "#0f151c";
const CONDUIT = "#1d2833";
const CONDUIT_2 = "#2a3846";
const PHOSPHOR = "#e8eef2";
const FOG = "#8796a5";
const SERVO = "#f4d012";

// Flat hexapod silhouette in the scan-bay palette, drawn instead of
// screenshotting the live 3D model since satori can't render WebGL.
// Chassis is a chamfered plate, matching the site's shape rule.
function HexapodMark() {
  const nearLegs = [
    { hip: [195, 220], knee: [165, 290], foot: [140, 335] },
    { hip: [280, 220], knee: [280, 295], foot: [280, 340] },
    { hip: [365, 220], knee: [395, 290], foot: [420, 335] },
  ];
  const farLegs = [
    { hip: [163, 200], knee: [133, 268], foot: [108, 313] },
    { hip: [248, 200], knee: [248, 273], foot: [248, 318] },
    { hip: [333, 200], knee: [363, 268], foot: [388, 313] },
  ];

  return (
    <svg width={440} height={340} viewBox="0 0 520 400" fill="none">
      {farLegs.map((l, i) => (
        <path
          key={`far-${i}`}
          d={`M ${l.hip[0]} ${l.hip[1]} L ${l.knee[0]} ${l.knee[1]} L ${l.foot[0]} ${l.foot[1]}`}
          stroke={CONDUIT_2}
          strokeWidth={8}
          strokeLinejoin="miter"
        />
      ))}
      {nearLegs.map((l, i) => (
        <path
          key={`near-${i}`}
          d={`M ${l.hip[0]} ${l.hip[1]} L ${l.knee[0]} ${l.knee[1]} L ${l.foot[0]} ${l.foot[1]}`}
          stroke={FOG}
          strokeWidth={10}
          strokeLinejoin="miter"
        />
      ))}
      {nearLegs.map((l, i) => (
        <rect
          key={`joint-${i}`}
          x={l.knee[0] - 9}
          y={l.knee[1] - 9}
          width={18}
          height={18}
          fill={SERVO}
        />
      ))}
      {nearLegs.map((l, i) => (
        <rect
          key={`foot-${i}`}
          x={l.foot[0] - 6}
          y={l.foot[1] - 6}
          width={12}
          height={12}
          fill={PHOSPHOR}
        />
      ))}
      <polygon
        points="186,150 390,150 390,204 374,220 170,220 170,166"
        fill={HULL}
        stroke={SERVO}
        strokeWidth={3}
      />
      <rect x={366} y={177} width={14} height={14} fill={SERVO} />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: VOID,
          backgroundImage: `linear-gradient(${CONDUIT} 1px, transparent 1px), linear-gradient(90deg, ${CONDUIT} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      >
        <div style={{ height: 8, width: "100%", display: "flex", backgroundColor: SERVO }} />
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "70px 80px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: SERVO }}>
              CS undergraduate, IIT Delhi
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 92,
                fontWeight: 800,
                color: PHOSPHOR,
                lineHeight: 0.95,
                letterSpacing: -2,
                textTransform: "uppercase",
              }}
            >
              Shivanshu Aryan
            </div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 30, fontWeight: 600, color: FOG }}>
              Robotics, game theory, systems, quant
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 36,
                alignItems: "center",
                borderLeftWidth: 6,
                borderLeftStyle: "solid",
                borderLeftColor: SERVO,
                backgroundColor: "rgba(244,208,18,0.12)",
                padding: "14px 26px",
              }}
            >
              <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: SERVO }}>
                Incoming intern, Peak XV Partners
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 460,
              height: 360,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(15,21,28,0.85)",
              border: `1px solid ${CONDUIT_2}`,
            }}
          >
            <HexapodMark />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
