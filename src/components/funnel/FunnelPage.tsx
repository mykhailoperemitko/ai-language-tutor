"use client";

import "@/lib/i18n";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFunnelFlow } from "@/hooks/useFunnelFlow";
import { getFunnelSteps } from "@/lib/funnel";
import FunnelHeader from "./FunnelHeader";
import QuestionStep from "./steps/QuestionStep";
import TutorsReveal from "./steps/TutorsReveal";
import PersonalizationReveal from "./steps/PersonalizationReveal";
import SuccessScreen from "./steps/SuccessScreen";

export default function FunnelPage() {
  const { t } = useTranslation("funnel");

  const {
    answers,
    completed,
    currentStep,
    stepIndex,
    totalSteps,
    goNext,
    goBack,
    setAnswer,
    submitFunnel,
  } = useFunnelFlow(useCallback((answers) => getFunnelSteps(t, answers), [t]));

  if (completed) {
    return <SuccessScreen email={answers.email ?? ""} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-cream)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FunnelHeader
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        onBack={goBack}
      />
      <main
        className="no-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "28px 0 48px" }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 24px" }}>
          <div key={stepIndex} className="fade-pop">
            {currentStep.type === "question" && (
              <QuestionStep
                step={currentStep}
                answers={answers}
                onAnswer={setAnswer}
                onNext={goNext}
                onSubmitFunnel={submitFunnel}
              />
            )}
            {currentStep.type === "tutors_reveal" && (
              <TutorsReveal step={currentStep} onNext={goNext} />
            )}
            {currentStep.type === "personalization_reveal" && (
              <PersonalizationReveal step={currentStep} onNext={goNext} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
