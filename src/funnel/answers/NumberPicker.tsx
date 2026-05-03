"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resolveTag } from "../utils/content";
import { numberPickerButtonColors } from "../utils/theme";
import type { NumberPicker as NumberPickerType } from "../utils/types";

type Props = {
  questionId: string;
  answer: NumberPickerType;
  value: number | undefined;
  onAnswer: (key: string, value: number) => void;
  onNext: () => void;
};

function getButtonBg(
  n: number,
  value: number,
  thresholds: readonly number[],
): string {
  if (n > value) return "var(--color-paper)";
  const tier = thresholds.findIndex((max) => n <= max);
  return (
    numberPickerButtonColors[
      Math.min(tier, numberPickerButtonColors.length - 1)
    ] ?? "var(--color-coral)"
  );
}

export default function NumberPicker({
  questionId,
  answer,
  value,
  onAnswer,
  onNext,
}: Props) {
  const { t } = useTranslation("funnel");
  const current = value ?? Math.ceil((answer.min + answer.max) / 2);
  const numbers = Array.from(
    { length: answer.max - answer.min + 1 },
    (_, i) => answer.min + i,
  );
  const thresholds = answer.tagThresholds ?? [];
  const tagLines = t(`${questionId}.tagLines`, {
    returnObjects: true,
  }) as string[];
  const tag = Array.isArray(tagLines)
    ? resolveTag(tagLines, thresholds, current)
    : "";
  const topColorThreshold = thresholds[1] ?? Math.ceil(answer.max * 0.6);

  useEffect(() => {
    if (value === undefined) onAnswer(questionId, current);
  }, []);

  return (
    <div>
      <div
        style={{
          background: "var(--color-cream-2)",
          border: "2px solid var(--color-ink)",
          borderRadius: 22,
          padding: "18px 16px",
          boxShadow: "0 4px 0 var(--color-ink)",
          marginBottom: 18,
          textAlign: "center",
        }}
      >
        <div className="display" style={{ fontSize: 64, lineHeight: 1 }}>
          {current}
          <span style={{ fontSize: 22, color: "var(--color-ink-soft)" }}>
            /{answer.max}
          </span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{tag}</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numbers.length}, 1fr)`,
          gap: 5,
          marginBottom: 8,
        }}
      >
        {numbers.map((n) => {
          const isSel = n === current;
          const filled = n <= current;
          return (
            <button
              key={n}
              onClick={() => onAnswer(questionId, n)}
              style={{
                aspectRatio: "1 / 1.1",
                background: getButtonBg(n, current, thresholds),
                color:
                  filled && n > topColorThreshold
                    ? "var(--color-text-on-accent)"
                    : "var(--color-ink)",
                border: "2px solid var(--color-ink)",
                borderRadius: 10,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: isSel
                  ? "0 3px 0 var(--color-ink)"
                  : "0 1px 0 var(--color-ink)",
                transform: isSel ? "translateY(-2px)" : "none",
                transition: "transform 100ms, background 150ms",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "var(--color-muted)",
          marginBottom: 18,
          padding: "0 2px",
        }}
      >
        <span>{t(`${questionId}.labelMin`)}</span>
        <span>{t(`${questionId}.labelMax`)}</span>
      </div>

      <button className="btn full" onClick={onNext}>
        {t(`${questionId}.continueLabel`)}
      </button>
    </div>
  );
}
