"use client";

import { useTranslation } from "react-i18next";
import { appConfig } from "@/lib/config";

type FunnelHeaderProps = {
  stepIndex: number;
  totalSteps: number;
  onBack: () => void;
};

export default function FunnelHeader({
  stepIndex,
  totalSteps,
  onBack,
}: FunnelHeaderProps) {
  const { t } = useTranslation("funnel");

  const progress = ((stepIndex + 1) / totalSteps) * 100;

  const stepLabel = t("header.stepLabel", {
    current: stepIndex + 1,
    total: totalSteps,
  });

  const overscrollInset = "calc(env(safe-area-inset-top, 0px) + 16px)";

  return (
    <div
      style={{
        padding: `${overscrollInset} 20px 10px`,
        marginTop: `calc(-1 * ${overscrollInset})`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "var(--color-paper)",
        borderBottom: "1px solid var(--color-line)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-terracotta)",
            userSelect: "none",
            display: "inline-block",
          }}
        >
          {appConfig.name}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {stepIndex > 0 ? (
          <button
            onClick={onBack}
            aria-label={t("header.back")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--color-cream)",
              border: "1px solid var(--color-line)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
              transition: "background 140ms ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path
                d="M9 2 L4 7 L9 12"
                stroke="var(--color-ink)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div style={{ width: 36, height: 36, flex: "none" }} />
        )}

        <div style={{ flex: 1 }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--color-ink-soft)",
            minWidth: 52,
            textAlign: "right",
          }}
        >
          {stepLabel}
        </div>
      </div>
    </div>
  );
}
