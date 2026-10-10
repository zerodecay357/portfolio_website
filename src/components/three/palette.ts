// Scene-side palette. Mirrors the CSS tokens in globals.css so the 3D
// reads as part of the same control room. Coolant lives only in here.
export const PALETTE = {
  void: "#080b10",
  hull: "#0f151c",
  conduit: "#1d2833",
  conduit2: "#2a3846",
  fog: "#8796a5",
  servo: "#f4d012",
  coolant: "#3fd7e6",
  deepBlue: "#1b2f8f",
} as const;

// One scan cycle drives the floor ring, the chassis glow pulse and the
// sweep, so every light event in the bay happens on the same beat.
export const SCAN_PERIOD = 3.2; // seconds per expanding ring pair
export const SWEEP_SPEED = 1.15; // radians per second
