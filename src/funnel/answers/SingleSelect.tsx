"use client";

import { useEffect, useRef } from "react";
import type { SingleSelect as SingleSelectType } from "../utils/types";

type Props = {
  answer: SingleSelectType;
  selected: string | undefined;
  onAnswer: (value: string) => void;
  onNext: () => void;
};

export default function SingleSelect({
  answer,
  selected,
  onAnswer,
  onNext,
}: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleSelect = (optionKey: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onAnswer(optionKey);
    timerRef.current = setTimeout(onNext, 240);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {answer.options.map((option, i) => {
        const isSel = selected === option.key;
        return (
          <button
            key={option.key}
            className={`tap-card fade-pop ${isSel ? "selected" : ""}`}
            style={{ animationDelay: `${i * 30}ms` }}
            onClick={() => handleSelect(option.key)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {option.emoji && (
                <div
                  aria-hidden="true"
                  style={{ fontSize: 28, lineHeight: 1, flex: "none" }}
                >
                  {option.emoji}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {option.title}
                </div>
                {option.subtitle && (
                  <div
                    style={{
                      marginTop: 3,
                      color: "var(--color-ink-soft)",
                      fontSize: 13,
                      lineHeight: 1.35,
                    }}
                  >
                    {option.subtitle}
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
