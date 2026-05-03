"use client";

import { useState, useReducer, useEffect, useRef } from "react";
import { submitFunnel as submitFunnelAction } from "@/app/actions/submitFunnel";
import { buildSubmission } from "@/lib/funnel";
import {
  logFunnelStarted,
  logStepViewed,
  logStepCompleted,
  logNavigatedBack,
  logEmailSubmitted,
  logSubmissionSucceeded,
  logSubmissionFailed,
  logDrop,
} from "@/lib/analytics";
import type { FunnelAnswers, FunnelStep, SubmitResult } from "@/lib/types";

const VALIDATION_ERROR = "Please complete the full quiz and try again.";

type State = {
  stepIndex: number;
  completed: boolean;
};

type Action = { type: "NEXT"; stepCount: number } | { type: "BACK" };

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

// question steps carry the answer subtype (e.g. "single_select"); reveal steps use their own type
function stepType(step: FunnelStep): string {
  if (step.type === "question") return step.answer.type;
  return step.type;
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

  const dropStateRef = useRef({ completed: false, stepIndex: 0, steps });

  useEffect(() => {
    dropStateRef.current = {
      completed: state.completed,
      stepIndex: state.stepIndex,
      steps,
    };
  });

  useEffect(() => {
    logFunnelStarted();

    const handleUnload = () => {
      const { completed, stepIndex: idx, steps: s } = dropStateRef.current;
      if (completed) return;
      const step = s[idx];
      if (step) logDrop(idx, step.key);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // steps is a new array reference every render, so omitting it is intentional —
  // step content is stable within a given stepIndex
  useEffect(() => {
    const step = steps[state.stepIndex];
    if (step) logStepViewed(state.stepIndex, step.key, stepType(step));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stepIndex]);

  const goNext = () => {
    const step = steps[state.stepIndex];
    if (step) logStepCompleted(state.stepIndex, step.key);
    dispatch({ type: "NEXT", stepCount: steps.length });
  };

  const goBack = () => {
    const step = steps[state.stepIndex];
    if (step) logNavigatedBack(state.stepIndex, step.key);
    dispatch({ type: "BACK" });
  };

  const setAnswer = (key: string, value: unknown) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const submitFunnel = async (email: string): Promise<SubmitResult> => {
    const payload = buildSubmission(answers, email);
    if (!payload) {
      return { ok: false, error: VALIDATION_ERROR };
    }

    logEmailSubmitted();
    const result = await submitFunnelAction(payload);

    if (!result.ok) {
      logSubmissionFailed(result.error);
      return result;
    }

    logSubmissionSucceeded();
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
    goBack,
    setAnswer,
    submitFunnel,
  };
}
