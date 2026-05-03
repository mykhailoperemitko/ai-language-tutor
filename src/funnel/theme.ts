export const funnelColors = {
  white: "var(--color-white)",
  paper: "var(--color-paper)",
  ink: "var(--color-ink)",
  line: "var(--color-line)",
  coral: "var(--color-coral)",
  coralLight: "var(--color-coral-light)",
  coralPale: "var(--color-coral-pale)",
  mint: "var(--color-mint)",
  lilac: "var(--color-lilac)",
  sun: "var(--color-sun)",
  terracotta: "var(--color-terracotta)",
  textOnAccent: "var(--color-text-on-accent)",
} as const;

export const numberPickerButtonColors = [
  funnelColors.coralLight,
  funnelColors.sun,
  funnelColors.coral,
] as const;

export const successConfettiColors = [
  funnelColors.terracotta,
  funnelColors.sun,
  funnelColors.mint,
  funnelColors.lilac,
  funnelColors.coralPale,
] as const;

export const tutorBadgeColors: Record<string, { bg: string; color: string }> = {
  breezy: { bg: funnelColors.mint, color: funnelColors.textOnAccent },
  knox: { bg: funnelColors.coral, color: funnelColors.textOnAccent },
  wren: { bg: funnelColors.lilac, color: funnelColors.textOnAccent },
  vesper: { bg: funnelColors.sun, color: funnelColors.ink },
};
