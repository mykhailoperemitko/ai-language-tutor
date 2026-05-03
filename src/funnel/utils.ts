export function resolveTag(
  tagLines: string[],
  thresholds: readonly number[],
  current: number,
): string {
  const index = thresholds.findIndex((max) => current <= max);
  return tagLines[index] ?? "";
}
