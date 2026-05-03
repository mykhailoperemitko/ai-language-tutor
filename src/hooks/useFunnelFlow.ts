"use client";

import { useMemo, useReducer } from "react";
import type { TFunction } from "i18next";
import { FUNNEL_STEP_COUNT, getFunnelSteps } from "@/lib/constants";
import type { FunnelAnswers } from "@/lib/types";

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
      if (state.stepIndex >= FUNNEL_STEP_COUNT - 1) {
        return { ...state, completed: true };
      }
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

export function useFunnelFlow(t: TFunction<"funnel">) {
  const [state, dispatch] = useReducer(reducer, {
    stepIndex: 0,
    answers: {},
    completed: false,
  });

  const steps = useMemo(
    () => getFunnelSteps(t, state.answers),
    [state.answers, t],
  );

  return {
    answers: state.answers,
    completed: state.completed,
    currentStep: steps[state.stepIndex],
    stepIndex: state.stepIndex,
    totalSteps: steps.length,
    goNext: () => dispatch({ type: "NEXT" }),
    goBack: () => dispatch({ type: "BACK" }),
    setAnswer: (key: string, value: unknown) =>
      dispatch({ type: "SET_ANSWER", key, value }),
  };
}
