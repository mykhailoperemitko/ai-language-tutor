export const numberPickerButtonColors = [
  "var(--color-coral-light)",
  "var(--color-sun)",
  "var(--color-coral)",
] as const;

export const successConfettiColors = [
  "var(--color-terracotta)",
  "var(--color-sun)",
  "var(--color-mint)",
  "var(--color-lilac)",
  "var(--color-coral-pale)",
] as const;

export const tutorBadgeColors: Record<string, { bg: string; color: string }> = {
  breezy: { bg: "var(--color-mint)", color: "var(--color-text-on-accent)" },
  knox: { bg: "var(--color-coral)", color: "var(--color-text-on-accent)" },
  wren: { bg: "var(--color-lilac)", color: "var(--color-text-on-accent)" },
  vesper: { bg: "var(--color-sun)", color: "var(--color-ink)" },
};
