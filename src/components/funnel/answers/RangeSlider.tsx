"use client";

import { useEffect } from "react";
import type { RangeSlider as RangeSliderType } from "@/lib/types";

type Props = {
  answer: RangeSliderType;
  value: number | undefined;
  onAnswer: (value: number) => void;
  onNext: () => void;
};

export default function RangeSlider({
  answer,
  value,
  onAnswer,
  onNext,
}: Props) {
  const current = value ?? answer.defaultValue;
  const ticks = [answer.min, 15, 30, answer.max];

  useEffect(() => {
    if (value === undefined) onAnswer(answer.defaultValue);
  }, [answer.defaultValue, onAnswer, value]);

  return (
    <div>
      <div
        style={{
          background: "var(--color-cream-2)",
          border: "2px solid var(--color-ink)",
          borderRadius: 22,
          padding: "20px",
          boxShadow: "0 4px 0 var(--color-ink)",
          textAlign: "center",
          marginBottom: 22,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--color-ink-soft)",
            textTransform: "uppercase",
            letterSpacing: 1.4,
          }}
        >
          {answer.unitLabel}
        </div>
        <div
          className="display"
          style={{ fontSize: 88, lineHeight: 1, margin: "4px 0" }}
        >
          {current}
          <span style={{ fontSize: 28, fontWeight: 600 }}> {answer.unit}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{answer.tag}</div>
      </div>

      <input
        type="range"
        min={answer.min}
        max={answer.max}
        step={answer.step}
        value={current}
        onChange={(e) => onAnswer(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--color-coral)", height: 32 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "var(--color-muted)",
          marginTop: -4,
          marginBottom: 18,
        }}
      >
        <span>
          {answer.min} {answer.unit}
        </span>
        {ticks.slice(1, -1).map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
        <span>{answer.max}+</span>
      </div>

      <button className="btn full" onClick={onNext}>
        {answer.ctaLabel}
      </button>
    </div>
  );
}
