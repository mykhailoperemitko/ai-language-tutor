"use client";

import { useState, useReducer } from "react";
import { submitFunnel as submitFunnelAction } from "@/app/actions/submitFunnel";
import { buildSubmission } from "@/lib/funnel";
import type { FunnelAnswers, FunnelStep, SubmitResult } from "@/lib/types";

const VALIDATION_ERROR = "Please complete the full quiz and try again.";

type State = {
  stepIndex: number;
  completed: boolean;
};

type Action =
  | { type: "NEXT"; stepCount: number }
  | { type: "BACK" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEXT":
      if (state.stepIndex >= action.stepCount - 1) {
        return { ...state, completed: true };
      }
      return { ...state, stepIndex: state.stepIndex + 1 };
    case "BACK":
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) };
    default:
      return state;
  }
}

export function useFunnelFlow(
  getSteps: (answers: FunnelAnswers) => FunnelStep[],
) {
  const [answers, setAnswers] = useState<FunnelAnswers>({});
  const steps = getSteps(answers);
  const [state, dispatch] = useReducer(reducer, {
    stepIndex: 0,
    completed: false,
  });

  const goNext = () => dispatch({ type: "NEXT", stepCount: steps.length });

  const setAnswer = (key: string, value: unknown) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

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

  return {
    answers,
    completed: state.completed,
    currentStep: steps[state.stepIndex],
    stepIndex: state.stepIndex,
    totalSteps: steps.length,
    goNext,
    goBack: () => dispatch({ type: "BACK" }),
    setAnswer,
    submitFunnel,
  };
}
