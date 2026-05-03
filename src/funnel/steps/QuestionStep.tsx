"use client";

import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import SingleSelect from "../answers/SingleSelect";
import MultiSelect from "../answers/MultiSelect";
import RangeSlider from "../answers/RangeSlider";
import NumberPicker from "../answers/NumberPicker";
import EmailInput from "../answers/EmailInput";
import { getOptionCopy } from "../utils/content";
import type { Question, FunnelAnswers } from "../utils/types";

type Props = {
  step: Question;
  answers: FunnelAnswers;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
};

// Replaces {key} placeholders in a heading string using collected answers.
// For select-type answers, resolves the translated option label.
function interpolate(
  raw: string,
  answers: FunnelAnswers,
  t: TFunction,
): string {
  return raw.replace(/\{(\w+)\}/g, (_, key) => {
    const val = answers[key as keyof FunnelAnswers];
    if (val === undefined || val === null) return "";
    if (typeof val === "string") return getOptionCopy(t, key, val).title;
    return String(val);
  });
}

export default function QuestionStep({
  step,
  answers,
  onAnswer,
  onNext,
}: Props) {
  const { t } = useTranslation("funnel");
  const rawHeading = t(`${step.id}.heading`, "");
  const heading = interpolate(rawHeading, answers, t);
  const subheading = t(`${step.id}.subheading`, "");

  return (
    <div>
      {heading && (
        <h2
          className="display"
          style={{ fontSize: 28, margin: "4px 0 6px", lineHeight: 1.05 }}
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p
          style={{
            margin: "0 0 18px",
            color: "var(--color-ink-soft)",
            fontSize: 15,
          }}
        >
          {subheading}
        </p>
      )}

      {step.answer.type === "single_select" && (
        <SingleSelect
          questionId={step.id}
          answer={step.answer}
          selected={
            answers[step.id as keyof typeof answers] as string | undefined
          }
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}

      {step.answer.type === "multi_select" && (
        <MultiSelect
          questionId={step.id}
          answer={step.answer}
          selected={
            answers[step.id as keyof typeof answers] as string[] | undefined
          }
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}

      {step.answer.type === "range_slider" && (
        <RangeSlider
          questionId={step.id}
          answer={step.answer}
          value={answers[step.id as keyof typeof answers] as number | undefined}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}

      {step.answer.type === "number_picker" && (
        <NumberPicker
          questionId={step.id}
          answer={step.answer}
          value={answers[step.id as keyof typeof answers] as number | undefined}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}

      {step.answer.type === "email_input" && (
        <EmailInput
          questionId={step.id}
          value={answers[step.id as keyof typeof answers] as string | undefined}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}
    </div>
  );
}
