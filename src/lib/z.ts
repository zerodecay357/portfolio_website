// The only z-index values the site uses. Sections stack in normal flow.
export const Z = {
  raised: 1, // content above a section's own decorative background
  stack: 10, // sticky project dossiers
  nav: 40,
  progress: 45,
  overlay: 60, // fixed CRT scanlines, pointer-events-none
} as const;
