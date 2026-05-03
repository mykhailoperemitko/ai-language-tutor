"use client";

import { useTranslation } from "react-i18next";
import { successConfettiColors } from "@/lib/theme";

function AccentIcon({ icon }: { icon: "spark" | "burst" | "check" }) {
  if (icon === "check") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path
          d="M2 7 L5.7 10.7 L12 3.4"
          stroke="currentColor"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "burst") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path
          d="M7 1.5 L8.5 5.5 L12.5 7 L8.5 8.5 L7 12.5 L5.5 8.5 L1.5 7 L5.5 5.5 Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M7 1.5 L8 4.8 L11.5 3.3 L9.8 6.3 L13 7 L9.8 7.7 L11.5 10.7 L8 9.2 L7 12.5 L6 9.2 L2.5 10.7 L4.2 7.7 L1 7 L4.2 6.3 L2.5 3.3 L6 4.8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "var(--color-coral-tint)",
            top: -110,
            right: -80,
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-mint) 22%, white)",
            bottom: -80,
            left: -90,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "10% 8% auto",
            height: 180,
            borderRadius: 999,
            background: "color-mix(in srgb, var(--color-sun) 34%, white)",
            opacity: 0.5,
          }}
        />
      </div>

      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {Array.from({ length: 52 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${(i * 9 + (i % 5) * 6) % 100}%`,
              width: i % 7 === 0 ? 12 : i % 4 === 0 ? 10 : i % 3 === 0 ? 7 : 8,
              height: i % 6 === 0 ? 16 : i % 5 === 0 ? 10 : i % 2 === 0 ? 14 : 12,
              background:
                successConfettiColors[i % successConfettiColors.length],
              border: "1.5px solid var(--color-ink)",
              borderRadius: i % 8 === 0 ? 999 : i % 5 === 0 ? 4 : 2,
              transform: `translateY(-24px) rotate(${i * 19}deg)`,
              animation:
                i % 3 === 0
                  ? `confetti-fall ${2.35 + (i % 5) * 0.22}s ease-in ${i * 0.04}s forwards`
                  : `confetti-fall-drift ${2.55 + (i % 4) * 0.2}s ease-in ${i * 0.035}s forwards`,
              ["--cx" as string]: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 7) * 9)}px`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "var(--color-paper)",
            border: "1.5px solid var(--color-ink)",
            borderRadius: "var(--r-card)",
            boxShadow: "var(--shadow-soft)",
            padding: "24px 20px 22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <div
              aria-hidden
              className="hero-bob"
              style={{
                width: 104,
                height: 104,
                borderRadius: 24,
                background: "var(--color-coral-light)",
                border: "2px solid var(--color-ink)",
                boxShadow: "0 3px 0 var(--color-ink)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                animation: "hero-glow 640ms cubic-bezier(0.2, 1, 0.3, 1) both",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 10,
                  borderRadius: 18,
                  border:
                    "1.5px dashed color-mix(in srgb, var(--color-ink) 28%, transparent)",
                  opacity: 0.45,
                }}
              />
              <div style={{ fontSize: 50, lineHeight: 1 }}>📬</div>
            </div>
          </div>

          <div>
            <div
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
                padding: "6px 10px",
                borderRadius: 999,
                border: "1.5px solid var(--color-ink)",
                background: "var(--color-paper)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <AccentIcon icon="spark" />
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-coral)",
                  border: "1px solid var(--color-ink)",
                }}
              />
              <AccentIcon icon="burst" />
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-mint)",
                  border: "1px solid var(--color-ink)",
                }}
              />
              <AccentIcon icon="check" />
            </div>

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
                margin: "0 auto 20px",
                maxWidth: 360,
              }}
            >
              {t("successScreen.body", { email })}
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-ink-soft)",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 14 14"
                style={{ color: "var(--color-mint-deep)" }}
                aria-hidden
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
      </div>
    </div>
  );
}
