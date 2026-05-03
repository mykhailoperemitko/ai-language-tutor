"use client";

import SingleSelect from "../answers/SingleSelect";
import MultiSelect from "../answers/MultiSelect";
import RangeSlider from "../answers/RangeSlider";
import NumberPicker from "../answers/NumberPicker";
import EmailInput from "../answers/EmailInput";
import type { Question, FunnelAnswers } from "../utils/types";

type Props = {
  step: Question;
  answers: FunnelAnswers;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
};

export default function QuestionStep({
  step,
  answers,
  onAnswer,
  onNext,
}: Props) {
  return (
    <div>
      {step.heading && (
        <h2
          className="display"
          style={{ fontSize: 28, margin: "4px 0 6px", lineHeight: 1.05 }}
        >
          {step.heading}
        </h2>
      )}
      {step.subheading && (
        <p
          style={{
            margin: "0 0 18px",
            color: "var(--color-ink-soft)",
            fontSize: 15,
          }}
        >
          {step.subheading}
        </p>
      )}

      {step.answer.type === "single_select" && (
        <SingleSelect
          answer={step.answer}
          selected={
            answers[step.key as keyof typeof answers] as string | undefined
          }
          onAnswer={(value) => onAnswer(step.key, value)}
          onNext={onNext}
        />
      )}

      {step.answer.type === "multi_select" && (
        <MultiSelect
          answer={step.answer}
          selected={
            answers[step.key as keyof typeof answers] as string[] | undefined
          }
          onAnswer={(value) => onAnswer(step.key, value)}
          onNext={onNext}
        />
      )}

      {step.answer.type === "range_slider" && (
        <RangeSlider
          answer={step.answer}
          value={answers[step.key as keyof typeof answers] as number | undefined}
          onAnswer={(value) => onAnswer(step.key, value)}
          onNext={onNext}
        />
      )}

      {step.answer.type === "number_picker" && (
        <NumberPicker
          answer={step.answer}
          value={answers[step.key as keyof typeof answers] as number | undefined}
          onAnswer={(value) => onAnswer(step.key, value)}
          onNext={onNext}
        />
      )}

      {step.answer.type === "email_input" && (
        <EmailInput
          answer={step.answer}
          value={answers[step.key as keyof typeof answers] as string | undefined}
          onAnswer={(value) => onAnswer(step.key, value)}
          onNext={onNext}
        />
      )}
    </div>
  );
}
