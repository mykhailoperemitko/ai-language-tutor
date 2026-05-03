"use client";

import type { MultiSelect as MultiSelectType } from "../utils/types";

type Props = {
  answer: MultiSelectType;
  selected: string[] | undefined;
  onAnswer: (value: string[]) => void;
  onNext: () => void;
};

export default function MultiSelect({
  answer,
  selected,
  onAnswer,
  onNext,
}: Props) {
  const value = selected ?? [];
  const max = answer.options.length;

  const toggle = (optionKey: string) => {
    if (value.includes(optionKey)) {
      onAnswer(value.filter((v) => v !== optionKey));
    } else if (value.length < max) {
      onAnswer([...value, optionKey]);
    }
  };

  const canContinue = value.length >= answer.minSelect;

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
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: isSel ? "var(--color-coral)" : "var(--color-paper)",
                color: isSel
                  ? "var(--color-text-on-accent)"
                  : "var(--color-ink)",
                border: "2px solid var(--color-ink)",
                borderRadius: 999,
                padding: "10px 14px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: isSel
                  ? "0 3px 0 var(--color-ink)"
                  : "0 2px 0 var(--color-ink)",
                transition: "transform 100ms, background 150ms",
                transform: isSel ? "translateY(-1px)" : "none",
              }}
            >
              {option.emoji && (
                <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>
                  {option.emoji}
                </span>
              )}
              {option.title}
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
        {answer.countSelectedLabel}
      </div>
      <button className="btn full" disabled={!canContinue} onClick={onNext}>
        {canContinue ? answer.continueLabel : answer.pickAtLeastLabel}
      </button>
    </div>
  );
}
