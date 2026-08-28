import { ImageResponse } from "next/og";

export const alt =
  "Shivanshu Aryan — Robotics, Game Theory, Systems, Quant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Flat, on-brand hexapod silhouette — echoes HexapodModel.tsx's chassis /
// leg / joint coloring, drawn instead of screenshotting the live 3D model
// since satori can't render WebGL.
function HexapodMark() {
  const nearLegs = [
    { hip: [195, 220], knee: [165, 290], foot: [140, 335], joint: "#CBB892" },
    { hip: [280, 220], knee: [280, 295], foot: [280, 340], joint: "#8C9A7B" },
    { hip: [365, 220], knee: [395, 290], foot: [420, 335], joint: "#CBB892" },
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
          stroke="#5C4F3F"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {nearLegs.map((l, i) => (
        <path
          key={`near-${i}`}
          d={`M ${l.hip[0]} ${l.hip[1]} L ${l.knee[0]} ${l.knee[1]} L ${l.foot[0]} ${l.foot[1]}`}
          stroke="#B9826A"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {nearLegs.map((l, i) => (
        <circle key={`joint-${i}`} cx={l.knee[0]} cy={l.knee[1]} r={9} fill={l.joint} />
      ))}
      {nearLegs.map((l, i) => (
        <circle key={`foot-${i}`} cx={l.foot[0]} cy={l.foot[1]} r={6} fill="#B9826A" />
      ))}
      <rect x={170} y={150} width={220} height={70} rx={30} fill="#232019" stroke="#B9826A" strokeWidth={3} />
      <circle cx={382} cy={185} r={10} fill="#CBB892" />
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
          backgroundColor: "#14120F",
        }}
      >
        <div
          style={{
            height: 8,
            width: "100%",
            display: "flex",
            backgroundImage: "linear-gradient(to right, #B9826A, #FFC7DF)",
          }}
        />
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
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#B9826A",
              }}
            >
              CS Undergraduate · IIT Delhi
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 78,
                fontWeight: 800,
                color: "#F3EFE8",
                lineHeight: 1,
              }}
            >
              Shivanshu Aryan
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 30,
                fontWeight: 600,
                color: "#9A9082",
              }}
            >
              Robotics · Game Theory · Systems · Quant
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 36,
                alignItems: "center",
                borderLeftWidth: 6,
                borderLeftStyle: "solid",
                borderLeftColor: "#B9826A",
                backgroundColor: "rgba(185,130,106,0.14)",
                padding: "14px 26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "#B9826A",
                }}
              >
                Incoming Intern · Peak XV Partners
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              width: 460,
              height: 360,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                width: 380,
                height: 380,
                borderRadius: 9999,
                backgroundColor: "#B9826A",
                opacity: 0.16,
              }}
            />
            <HexapodMark />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
