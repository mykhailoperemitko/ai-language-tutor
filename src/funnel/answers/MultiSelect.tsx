"use client";

import { useTranslation } from "react-i18next";
import type { MultiSelect as MultiSelectType } from "../types";
import { funnelColors } from "../theme";

type Props = {
  questionId: string;
  answer: MultiSelectType;
  selected: string[] | undefined;
  onAnswer: (key: string, value: string[]) => void;
  onNext: () => void;
};

export default function MultiSelect({
  questionId,
  answer,
  selected,
  onAnswer,
  onNext,
}: Props) {
  const { t } = useTranslation("funnel");
  const value = selected ?? [];
  const min = answer.minSelect ?? 1;
  const max = answer.options.length;

  const toggle = (optionKey: string) => {
    if (value.includes(optionKey)) {
      onAnswer(
        questionId,
        value.filter((v) => v !== optionKey),
      );
    } else if (value.length < max) {
      onAnswer(questionId, [...value, optionKey]);
    }
  };

  const canContinue = value.length >= min;

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}
      >
        {answer.options.map((option) => {
          const isSel = value.includes(option.key);
          return (
            <button
              key={option.key}
              onClick={() => toggle(option.key)}
              style={{
                background: isSel ? funnelColors.coral : funnelColors.paper,
                color: isSel ? funnelColors.textOnAccent : funnelColors.ink,
                border: `2px solid ${funnelColors.ink}`,
                borderRadius: 999,
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: isSel
                  ? `0 3px 0 ${funnelColors.ink}`
                  : `0 2px 0 ${funnelColors.ink}`,
                transition: "transform 100ms, background 150ms",
                transform: isSel ? "translateY(-1px)" : "none",
              }}
            >
              {t(`${questionId}.options.${option.key}`)}
            </button>
          );
        })}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--color-ink-soft)",
          marginBottom: 12,
        }}
      >
        {t("common.countSelected", { count: value.length })}
      </div>
      <button className="btn full" disabled={!canContinue} onClick={onNext}>
        {canContinue ? t("common.continue") : t("common.pickAtLeast", { min })}
      </button>
    </div>
  );
}
