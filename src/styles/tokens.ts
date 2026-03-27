/**
 * JS-side mirrors of CSS token values.
 *
 * Use these when you need token values in TypeScript — e.g. for layout
 * components that need max-width numbers, or for JS-driven calculations.
 * The CSS variables in globals.css are the source of truth for styles;
 * keep these in sync when you update the CSS.
 */

export const containerWidths = {
  sm: "40rem",   // 640px  — matches --container-sm
  md: "48rem",   // 768px  — matches --container-md
  lg: "64rem",   // 1024px — matches --container-lg
  xl: "80rem",   // 1280px — matches --container-xl
} as const

export const sectionSpacing = {
  sm: "3rem",    // 48px  — matches --section-spacing-sm
  md: "5rem",    // 80px  — matches --section-spacing-md
  lg: "8rem",    // 128px — matches --section-spacing-lg
} as const

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

export const textScale = {
  display: "4.5rem",   // matches --text-display
  h1: "3rem",          // matches --text-h1
  h2: "2.25rem",       // matches --text-h2
  h3: "1.875rem",      // matches --text-h3
  h4: "1.5rem",        // matches --text-h4
  body: "1rem",        // matches --text-body
  sm: "0.875rem",      // matches --text-sm
  xs: "0.75rem",       // matches --text-xs
} as const

export type ContainerSize = keyof typeof containerWidths
export type SectionSpacing = keyof typeof sectionSpacing
export type TextScale = keyof typeof textScale
