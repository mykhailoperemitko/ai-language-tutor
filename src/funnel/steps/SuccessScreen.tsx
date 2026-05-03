"use client";

import { useTranslation } from "react-i18next";
import { successConfettiColors } from "../utils/theme";

export default function SuccessScreen({ email }: { email: string }) {
  const { t } = useTranslation("funnel");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${(i * 17) % 100}%`,
              width: 8,
              height: 12,
              background:
                successConfettiColors[i % successConfettiColors.length],
              border: "1.5px solid var(--color-ink)",
              borderRadius: 2,
              animation: `confetti-fall ${2.4 + (i % 5) * 0.3}s ease-in ${i * 0.07}s forwards`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          maxWidth: 480,
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>📬</div>

        <h2
          className="display"
          style={{ fontSize: 30, margin: "0 0 12px", lineHeight: 1.05 }}
        >
          {t("successScreen.heading")}
        </h2>

        <p
          style={{
            color: "var(--color-ink-soft)",
            fontSize: 15,
            lineHeight: 1.45,
            marginBottom: 24,
          }}
        >
          {t("successScreen.body", { email })}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--color-mint)",
            color: "var(--color-text-on-accent)",
            border: "2px solid var(--color-ink)",
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 14,
            fontWeight: 700,
            boxShadow: "0 2px 0 var(--color-ink)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            style={{ color: "var(--color-text-on-accent)" }}
          >
            <path
              d="M2 7 L6 11 L12 3"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t("successScreen.confirmLabel")}
        </div>
      </div>
    </div>
  );
}
