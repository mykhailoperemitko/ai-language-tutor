"use client";

import type { PersonalizationReveal as PersonalizationRevealType } from "@/lib/types";

type Props = {
  step: PersonalizationRevealType;
  onNext: () => void;
};

export default function PersonalizationReveal({ step, onNext }: Props) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span
          className="chip"
          style={{
            background: "var(--color-mint)",
            color: "var(--color-text-on-accent)",
            borderColor: "var(--color-ink)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            style={{ color: "var(--color-text-on-accent)" }}
          >
            <path
              d="M2 6 L5 9 L10 3"
              stroke="currentColor"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {step.chipLabel}
        </span>
      </div>

      <h2
        className="display"
        style={{ fontSize: 28, margin: "4px 0 8px", lineHeight: 1.05 }}
      >
        {step.heading}
      </h2>

      <p
        style={{
          margin: "0 0 20px",
          color: "var(--color-ink-soft)",
          fontSize: 15,
          lineHeight: 1.5,
        }}
      >
        {step.body}
      </p>

      <div
        style={{
          background: "var(--color-paper)",
          border: "2px solid var(--color-ink)",
          borderRadius: 18,
          padding: "16px 18px",
          boxShadow: "0 4px 0 var(--color-ink)",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.4,
            color: "var(--color-ink-soft)",
            marginBottom: 12,
          }}
        >
          {step.bulletsHeading}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {step.bullets.map((bullet, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: "var(--color-mint)",
                  border: "2px solid var(--color-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                }}
              >
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
              </div>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="btn full" onClick={onNext}>
        {step.ctaLabel}
      </button>
    </div>
  );
}
