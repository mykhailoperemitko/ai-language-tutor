"use client";

import Image from "next/image";

import { tutorBadgeColors } from "@/lib/theme";
import type { TutorsReveal as TutorsRevealType } from "@/lib/types";

type Props = {
  step: TutorsRevealType;
  onNext: () => void;
};

export default function TutorsReveal({ step, onNext }: Props) {
  return (
    <div>
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
        }}
      >
        {step.body}
      </p>

      <div
        className="tutor-grid"
        style={{
          marginBottom: 18,
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
              className="fade-pop tutor-card"
              style={{
                border: "1.5px solid var(--color-ink)",
                borderRadius: "var(--r-card)",
                boxShadow: "var(--shadow-soft)",
                position: "relative",
                overflow: "hidden",
                minHeight: 220,
                animationDelay: `${i * 60}ms`,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                <Image
                  src={tutor.imageSrc}
                  alt={tutor.name}
                  fill
                  sizes="(min-width: 520px) 50vw, 100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgb(31 27 23 / 0.92) 0%, rgb(31 27 23 / 0.55) 42%, rgb(31 27 23 / 0.12) 100%)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  minHeight: 220,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "auto" }}>
                  <span
                    className="chip"
                    style={{
                      background: badge.bg,
                      color: badge.color,
                      borderColor: "var(--color-ink)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tutor.badge}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: 1.15,
                    minWidth: 0,
                    color: "var(--color-white)",
                    marginBottom: 4,
                  }}
                >
                  {tutor.name}
                </div>
                <div
                  className="tutor-description"
                  style={{
                    color: "rgb(255 255 255 / 0.88)",
                  }}
                >
                  {tutor.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          paddingTop: 8,
          background:
            "linear-gradient(to bottom, rgb(251 246 236 / 0), var(--color-cream) 26px)",
        }}
      >
        <button className="btn full" onClick={onNext}>
          {step.ctaLabel}
        </button>
      </div>
    </div>
  );
}
