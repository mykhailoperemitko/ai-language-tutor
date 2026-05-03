"use client";

import type { PersonalizationReveal as PersonalizationRevealType } from "@/lib/types";

type Props = {
  step: PersonalizationRevealType;
  onNext: () => void;
};

const NODE_COLORS = [
  "var(--color-coral)",
  "var(--color-terracotta)",
  "var(--color-sun)",
  "var(--color-mint)",
];

export default function PersonalizationReveal({ step, onNext }: Props) {
  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 28, margin: "0 0 16px", lineHeight: 1.05 }}
      >
        {step.heading}
      </h2>

      {/* Answer highlights — 3 cards showing user's actual answers */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {step.highlights.map((h) => (
          <div
            key={h.label}
            style={{
              flex: 1,
              background: "var(--color-paper)",
              border: "2px solid var(--color-ink)",
              borderRadius: 16,
              boxShadow: "0 3px 0 var(--color-ink)",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{h.emoji}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-ink-soft)",
              }}
            >
              {h.label}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-ink)",
                lineHeight: 1.2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {h.value}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline layout */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.4,
            color: "var(--color-ink-soft)",
            marginBottom: 16,
          }}
        >
          {step.bulletsHeading}
        </div>

        <div style={{ position: "relative", paddingLeft: 36 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 11,
              top: 12,
              bottom: 12,
              width: 2,
              background:
                "repeating-linear-gradient(to bottom, var(--color-line) 0px, var(--color-line) 6px, transparent 6px, transparent 12px)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {step.bullets.map((bullet, i) => {
              const isLast = i === step.bullets.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    paddingBottom: isLast ? 0 : 20,
                    position: "relative",
                  }}
                >
                  {/* Node */}
                  <div
                    style={{
                      position: "absolute",
                      left: -36,
                      top: 0,
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      background: NODE_COLORS[i % NODE_COLORS.length],
                      border: "2px solid var(--color-ink)",
                      boxShadow: "0 2px 0 var(--color-ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                      color: "var(--color-text-on-accent)",
                      fontSize: 11,
                      fontWeight: 800,
                      zIndex: 1,
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Text */}
                  <div style={{ paddingTop: 2 }}>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: "var(--color-ink)",
                      }}
                    >
                      {bullet}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button className="btn full" onClick={onNext} style={{ marginTop: 24 }}>
        {step.ctaLabel}
      </button>
    </div>
  );
}
