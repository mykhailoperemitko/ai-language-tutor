"use server";

import en from "../../../locales/en.json";
import type { FunnelSubmission, SubmitResult } from "@/lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBMIT_ERROR = "Could not submit your plan right now. Please try again.";
const VALIDATION_ERROR = "Please complete the full quiz and try again.";

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function hasOption(
  section: Record<string, { title?: string }> | undefined,
  key: string | undefined,
): boolean {
  return !!key && !!section?.[key];
}

function resolveOptionLabel(
  section: Record<string, { title?: string }> | undefined,
  key: string | undefined,
): string {
  if (!key) return "Not answered";
  return section?.[key]?.title ?? key;
}

function validateSubmission(
  payload: FunnelSubmission,
): FunnelSubmission | null {
  const funnel = en.funnel;
  const {
    age,
    nativeLanguage,
    level,
    topics,
    dailyMinutes,
    motivation,
    fluencyTimeline,
    email,
  } = payload;

  if (typeof email !== "string" || !EMAIL_RE.test(email)) return null;
  if (typeof age !== "string" || !hasOption(funnel.age.options, age))
    return null;
  if (
    typeof nativeLanguage !== "string" ||
    !hasOption(funnel.nativeLanguage.options, nativeLanguage)
  ) {
    return null;
  }
  if (typeof level !== "string" || !hasOption(funnel.level.options, level)) {
    return null;
  }
  if (
    typeof fluencyTimeline !== "string" ||
    !hasOption(funnel.fluencyTimeline.options, fluencyTimeline)
  ) {
    return null;
  }
  if (!isStringArray(topics) || topics.length === 0) return null;

  const validTopics = topics.every((topic) =>
    hasOption(funnel.topics.options, topic),
  );
  if (!validTopics) return null;

  if (
    typeof dailyMinutes !== "number" ||
    !Number.isFinite(dailyMinutes) ||
    dailyMinutes < 5 ||
    dailyMinutes > 60 ||
    dailyMinutes % 5 !== 0
  ) {
    return null;
  }
  if (
    typeof motivation !== "number" ||
    !Number.isFinite(motivation) ||
    motivation < 1 ||
    motivation > 10
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

function formatMessage(answers: FunnelSubmission): string {
  const funnel = en.funnel;

  const topicLabels = answers.topics
    .map((topic) => resolveOptionLabel(funnel.topics.options, topic))
    .join(", ");

  const rows = [
    `1) Age: ${resolveOptionLabel(funnel.age.options, answers.age)}`,
    `2) Native language: ${resolveOptionLabel(funnel.nativeLanguage.options, answers.nativeLanguage)}`,
    "3) Tutors reveal: Seen",
    `4) English level: ${resolveOptionLabel(funnel.level.options, answers.level)}`,
    `5) Focus topics: ${topicLabels}`,
    `6) Daily practice: ${answers.dailyMinutes} min/day`,
    "7) Personalization reveal: Seen",
    `8) Motivation (1-10): ${answers.motivation}`,
    `9) Fluency timeline: ${resolveOptionLabel(funnel.fluencyTimeline.options, answers.fluencyTimeline)}`,
    `10) Email: ${answers.email}`,
  ];

  return [
    "New funnel submission",
    `Submitted: ${new Date().toISOString()}`,
    "",
    ...rows,
  ].join("\n");
}

export async function submitFunnel(
  payload: FunnelSubmission,
): Promise<SubmitResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, error: SUBMIT_ERROR };
  }

  const answers = validateSubmission(payload);

  if (!answers) {
    return { ok: false, error: VALIDATION_ERROR };
  }

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatMessage(answers),
        }),
      },
    );

    if (!telegramResponse.ok) {
      return { ok: false, error: SUBMIT_ERROR };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: SUBMIT_ERROR };
  }
}
