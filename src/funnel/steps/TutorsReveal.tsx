"use client";

import { useTranslation } from "react-i18next";
import type { TutorsReveal as TutorsRevealType } from "../types";
import { tutorBadgeColors } from "../theme";

type Props = {
  step: TutorsRevealType;
  onNext: () => void;
};

export default function TutorsReveal({ step, onNext }: Props) {
  const { t } = useTranslation("funnel");

  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 28, margin: "4px 0 8px", lineHeight: 1.05 }}
      >
        {t("tutors_reveal.heading")}
      </h2>
      <p
        style={{
          margin: "0 0 20px",
          color: "var(--color-ink-soft)",
          fontSize: 15,
        }}
      >
        {t("tutors_reveal.body")}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {step.tutors.map((tutor, i) => {
          const badge = tutorBadgeColors[tutor.key] ?? {
            bg: "var(--color-line)",
            color: "var(--color-ink)",
          };
          return (
            <div
              key={tutor.key}
              className="fade-pop"
              style={{
                background: "var(--color-paper)",
                border: "1.5px solid var(--color-ink)",
                borderRadius: "var(--r-card)",
                padding: "16px 14px",
                boxShadow: "var(--shadow-soft)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                animationDelay: `${i * 60}ms`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "var(--color-cream-2)",
                  border: "2px solid var(--color-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                {tutor.emoji}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>
                  {t(`tutors_reveal.tutors.${tutor.key}.name`)}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--color-ink-soft)",
                    lineHeight: 1.4,
                    marginBottom: 8,
                  }}
                >
                  {t(`tutors_reveal.tutors.${tutor.key}.description`)}
                </div>
                <span
                  className="chip"
                  style={{
                    background: badge.bg,
                    color: badge.color,
                    borderColor: "var(--color-ink)",
                  }}
                >
                  {t(`tutors_reveal.tutors.${tutor.key}.badge`)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn full" onClick={onNext}>
        {t("tutors_reveal.ctaLabel", "Continue")}
      </button>
    </div>
  );
}
