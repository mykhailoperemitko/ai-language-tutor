"use client";

import { submitFunnel as submitFunnelAction } from "@/app/actions/submitFunnel";
import "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useFunnelFlow } from "@/hooks/useFunnelFlow";
import { buildSubmission } from "@/lib/funnel";
import type { SubmitResult } from "@/lib/types";
import FunnelHeader from "./FunnelHeader";
import QuestionStep from "./steps/QuestionStep";
import TutorsReveal from "./steps/TutorsReveal";
import PersonalizationReveal from "./steps/PersonalizationReveal";
import SuccessScreen from "./steps/SuccessScreen";

const VALIDATION_ERROR = "Please complete the full quiz and try again.";

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
  } = useFunnelFlow(t);

  const submitFunnel = async (email: string): Promise<SubmitResult> => {
    const payload = buildSubmission(answers, email);
    if (!payload) {
      return { ok: false, error: VALIDATION_ERROR };
    }

    const result = await submitFunnelAction(payload);
    if (!result.ok) return result;

    setAnswer("email", email);
    goNext();
    return { ok: true };
  };

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
