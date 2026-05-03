"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getOptionCopy } from "../utils/content";
import type { SingleSelect as SingleSelectType } from "../utils/types";

type Props = {
  questionId: string;
  answer: SingleSelectType;
  selected: string | undefined;
  onAnswer: (key: string, value: string) => void;
  onNext: () => void;
};

export default function SingleSelect({
  questionId,
  answer,
  selected,
  onAnswer,
  onNext,
}: Props) {
  const { t } = useTranslation("funnel");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleSelect = (optionKey: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onAnswer(questionId, optionKey);
    timerRef.current = setTimeout(onNext, 240);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {answer.options.map((option, i) => {
        const isSel = selected === option.key;
        const copy = getOptionCopy(t, questionId, option.key);
        return (
          <button
            key={option.key}
            className={`tap-card fade-pop ${isSel ? "selected" : ""}`}
            style={{ animationDelay: `${i * 30}ms` }}
            onClick={() => handleSelect(option.key)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {copy.title}
                </div>
                {copy.subtitle && (
                  <div
                    style={{
                      marginTop: 3,
                      color: "var(--color-ink-soft)",
                      fontSize: 13,
                      lineHeight: 1.35,
                    }}
                  >
                    {copy.subtitle}
                  </div>
                )}
              </div>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  border: "2px solid var(--color-ink)",
                  background: isSel ? "var(--color-coral)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                  transition: "background 200ms",
                }}
              >
                {isSel && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    style={{ color: "var(--color-text-on-accent)" }}
                  >
                    <path
                      d="M2 5 L4 7 L8 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
