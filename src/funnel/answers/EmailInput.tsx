"use client";

import { useEffect, useRef, useState } from "react";
import type { EmailInput as EmailInputType } from "../utils/types";

type Props = {
  answer: EmailInputType;
  value: string | undefined;
  onAnswer: (value: string) => void;
  onNext: () => void;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function EmailInput({
  answer,
  value,
  onAnswer,
  onNext,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = value ?? "";
  const valid = EMAIL_RE.test(email);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    timerRef.current = setTimeout(onNext, 700);
  };

  return (
    <form onSubmit={submit}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "var(--color-ink-soft)",
          marginBottom: 6,
          display: "block",
        }}
      >
        {answer.label}
      </label>
      <div
        style={{
          border: "2px solid var(--color-ink)",
          borderRadius: 14,
          background: "var(--color-white)",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 3px 0 var(--color-ink)",
        }}
      >
        <span style={{ fontSize: 18 }}>✉️</span>
        <input
          type="email"
          autoComplete="email"
          placeholder={answer.placeholder}
          value={email}
          onChange={(e) => onAnswer(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 16,
            fontFamily: "inherit",
            background: "transparent",
          }}
        />
        {email && (
          <span
            style={{
              color: valid ? "var(--color-mint-deep)" : "var(--color-coral)",
              fontWeight: 700,
            }}
          >
            {valid ? "✓" : "!"}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--color-muted)",
          marginTop: 8,
          marginBottom: 18,
        }}
      >
        🔒 {answer.legalNote}
      </div>
      <button
        className="btn full"
        type="submit"
        disabled={!valid || submitting}
      >
        {submitting ? answer.submittingLabel : answer.ctaLabel}
      </button>
    </form>
  );
}
