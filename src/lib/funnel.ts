import type { FunnelAnswers, FunnelSubmission } from "./types";

export function buildSubmission(
  answers: FunnelAnswers,
  email: string,
): FunnelSubmission | null {
  const {
    age,
    nativeLanguage,
    level,
    topics,
    dailyMinutes,
    motivation,
    fluencyTimeline,
  } = answers;

  if (
    typeof age !== "string" ||
    typeof nativeLanguage !== "string" ||
    typeof level !== "string" ||
    !Array.isArray(topics) ||
    topics.length === 0 ||
    topics.some((topic) => typeof topic !== "string") ||
    typeof dailyMinutes !== "number" ||
    typeof motivation !== "number" ||
    typeof fluencyTimeline !== "string"
  ) {
    return null;
  }

  return {
    age,
    nativeLanguage,
    level,
    topics,
    dailyMinutes,
    motivation,
    fluencyTimeline,
    email,
  };
}
