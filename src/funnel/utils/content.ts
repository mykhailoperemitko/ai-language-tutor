import type { TFunction } from "i18next";

export type OptionCopy = {
  title: string;
  subtitle?: string;
};

export function getOptionCopy(
  t: TFunction,
  questionId: string,
  optionKey: string,
): OptionCopy {
  const copy = t(`${questionId}.options.${optionKey}`, {
    returnObjects: true,
  }) as unknown;

  if (
    typeof copy !== "object" ||
    copy === null ||
    !("title" in copy) ||
    typeof copy.title !== "string"
  ) {
    throw new Error(
      `Invalid option copy for ${questionId}.options.${optionKey}: expected { title, subtitle? }`,
    );
  }

  const subtitle =
    "subtitle" in copy && typeof copy.subtitle === "string"
      ? copy.subtitle
      : undefined;

  return {
    title: copy.title,
    subtitle,
  };
}

export function resolveTag(
  tagLines: string[],
  thresholds: readonly number[],
  current: number,
): string {
  const index = thresholds.findIndex((max) => current <= max);
  return tagLines[index] ?? "";
}
