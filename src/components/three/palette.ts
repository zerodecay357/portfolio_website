// Scene-side palette. Mirrors the CSS tokens in globals.css so the 3D
// reads as part of the same chrome lab. Ember is a trace accent only.
export const PALETTE = {
  obsidian: "#05070a",
  graphite: "#0a0e13",
  panel: "#0e1319",
  hairline: "#1c232b",
  hairline2: "#2a323c",
  steel: "#9aa3ad",
  chrome: "#f1f3f5",
  light: "#eef3f8", // cool studio white
  ember: "#ff6a2b",
} as const;

// One slow beat for the platform's hairline ring and the chassis glow,
// so the only recurring light event in the studio happens rarely.
export const RING_PERIOD = 8; // seconds between ring emissions
export const SWEEP_SPEED = 1.15; // radians per second (LiDAR highlight)
