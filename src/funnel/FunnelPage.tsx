"use client";

import "@/utils/i18n";
import { useReducer } from "react";
import FunnelHeader from "./FunnelHeader";
import QuestionStep from "./steps/QuestionStep";
import TutorsReveal from "./steps/TutorsReveal";
import PersonalizationReveal from "./steps/PersonalizationReveal";
import SuccessScreen from "./steps/SuccessScreen";
import { FUNNEL_STEPS } from "./utils/constants";
import type { FunnelAnswers } from "./utils/types";

type State = {
  stepIndex: number;
  answers: FunnelAnswers;
  completed: boolean;
};

type Action =
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "SET_ANSWER"; key: string; value: unknown };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT":
      if (state.stepIndex >= FUNNEL_STEPS.length - 1)
        return { ...state, completed: true };
      return { ...state, stepIndex: state.stepIndex + 1 };
    case "BACK":
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };
    default:
      return state;
  }
}

export default function FunnelPage() {
  const [state, dispatch] = useReducer(reducer, {
    stepIndex: 0,
    answers: {},
    completed: false,
  });

  const goNext = () => dispatch({ type: "NEXT" });
  const goBack = () => dispatch({ type: "BACK" });
  const setAnswer = (key: string, value: unknown) =>
    dispatch({ type: "SET_ANSWER", key, value });

  if (state.completed) {
    return <SuccessScreen email={state.answers.email ?? ""} />;
  }

  const currentStep = FUNNEL_STEPS[state.stepIndex];

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
        stepIndex={state.stepIndex}
        totalSteps={FUNNEL_STEPS.length}
        onBack={goBack}
      />
      <main
        className="no-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "28px 0 48px" }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 24px" }}>
          <div key={state.stepIndex} className="fade-pop">
            {currentStep.type === "question" && (
              <QuestionStep
                step={currentStep}
                answers={state.answers}
                onAnswer={setAnswer}
                onNext={goNext}
              />
            )}
            {currentStep.type === "tutors_reveal" && (
              <TutorsReveal step={currentStep} onNext={goNext} />
            )}
            {currentStep.type === "personalization_reveal" && (
              <PersonalizationReveal answers={state.answers} onNext={goNext} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
