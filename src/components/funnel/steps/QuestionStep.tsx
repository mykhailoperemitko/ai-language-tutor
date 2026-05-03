"use client";

import { Trans, useTranslation } from "react-i18next";
import SingleSelect from "../answers/SingleSelect";
import MultiSelect from "../answers/MultiSelect";
import RangeSlider from "../answers/RangeSlider";
import NumberPicker from "../answers/NumberPicker";
import EmailInput from "../answers/EmailInput";
import type { Question, FunnelAnswers } from "@/lib/types";

type Props = {
  step: Question;
  answers: FunnelAnswers;
  onAnswer: (key: string, value: unknown) => void;
  onNext: () => void;
  onSubmitFunnel: (
    email: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

const headingStyle: React.CSSProperties = {
  fontSize: 28,
  margin: "4px 0 6px",
  lineHeight: 1.05,
};

export default function QuestionStep({
  step,
  answers,
  onAnswer,
  onNext,
  onSubmitFunnel,
}: Props) {
  const { t } = useTranslation("funnel");

  return (
    <div>
      {step.headingHighlight ? (
        <h2 className="display" style={headingStyle}>
          <Trans
            t={t}
            i18nKey={`${step.key}.heading`}
            values={{ highlight: step.headingHighlight }}
            components={{ h: <span style={{ color: "var(--color-coral)" }} /> }}
          />
        </h2>
      ) : step.heading ? (
        <h2 className="display" style={headingStyle}>
          {step.heading}
        </h2>
      ) : null}
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
          onSubmit={onSubmitFunnel}
        />
      )}
    </div>
  );
}
