/* ── FRAME Brand Specs v2.0 — Strict Color Palette ── */
/* Canonical source: brand.json (root) · See BRAND.md for spec. */
/* Values below MUST match brand.json.colors exactly. */
/* This JS module exposes the same palette in ES module form for React consumers. */

export const INDIGO = "#1800AD";
export const ELECTRIC_BLUE = "#4FC3F7";
export const CORAL_RED = "#FF5252";
export const CORAL_LIGHT = "#FF8A80";
export const DARK_NAVY = "#06061A";

export const DARK = {
  bg: DARK_NAVY, panel: "#0E1235", panelLight: "#131848",
  border: "#222860", blue: "#181E4A", blueMid: "#1E2560", blueLight: "#2A3270",
  accent: ELECTRIC_BLUE, accentData: ELECTRIC_BLUE, white: "#FFFFFF", offWhite: "#E0E0E0",
  muted: "#B0B0B0", mutedDark: "#6670A0",
  red: CORAL_RED, orange: CORAL_LIGHT, yellow: ELECTRIC_BLUE,
  green: ELECTRIC_BLUE, teal: ELECTRIC_BLUE, text: "#FFFFFF",
  mapBg: "#050820", mapLand: "#121860",
  headerBg: "#080C24",
  alertBg: "#0A0E28",
  tabBg: "#080C24", footerBg: "#080C24",
  scrollBg: DARK_NAVY, scrollThumb: "#222860",
  tooltipBg: "#1A2058", tooltipBorder: "#2E3880", tooltipText: "#FFFFFF",
  cardQuoteBg: "#0A0E28",
};

export const LIGHT = {
  bg: "#F5F5F7", panel: "#FFFFFF", panelLight: "#F0F0F4",
  border: "#E0E0E0", blue: "#E8E8F0", blueMid: "#D0D0E0", blueLight: "#B8B8D0",
  accent: INDIGO, accentData: ELECTRIC_BLUE, white: DARK_NAVY, offWhite: "#333344",
  muted: "#666666", mutedDark: "#999999",
  red: CORAL_RED, orange: CORAL_LIGHT, yellow: INDIGO,
  green: ELECTRIC_BLUE, teal: INDIGO, text: DARK_NAVY,
  mapBg: "#E8E8F0", mapLand: "#D0D0E0",
  headerBg: "#FFFFFF",
  alertBg: "#F5F5F7",
  tabBg: "#FFFFFF", footerBg: "#FFFFFF",
  scrollBg: "#F5F5F7", scrollThumb: "#D0D0D8",
  tooltipBg: "#1A1A3E", tooltipBorder: "#2E3058", tooltipText: "#FFFFFF",
  cardQuoteBg: "#F0F0F4",
};

export const ACCENT = {
  red: CORAL_RED, orange: CORAL_LIGHT, yellow: ELECTRIC_BLUE,
  green: ELECTRIC_BLUE, teal: ELECTRIC_BLUE, accent: ELECTRIC_BLUE, muted: ELECTRIC_BLUE,
};
