export type AnswerOption = { key: string };

export type SingleSelect = { type: "single_select"; options: AnswerOption[] };

export type MultiSelect = {
  type: "multi_select";
  options: AnswerOption[];
  minSelect?: number;
};

export type RangeSlider = {
  type: "range_slider";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
};

export type NumberPicker = {
  type: "number_picker";
  min: number;
  max: number;
};

export type EmailInput = { type: "email_input" };

export type Answer =
  | SingleSelect
  | MultiSelect
  | RangeSlider
  | NumberPicker
  | EmailInput;

export type Tutor = { key: string; emoji: string };

export type Question = {
  type:"question";
  id: string;
  step: number;
  answer: Answer;
};

export type TutorsReveal = {
  type: "tutors_reveal";
  id: string;
  step: number;
  tutors: Tutor[];
};

export type PersonalizationReveal = {
  type: "personalization_reveal";
  id: string;
  step: number;
};

export type FunnelStep = Question | TutorsReveal | PersonalizationReveal;

// ─── Funnel answer types ──────────────────────────────────────────────
// For select questions the stored value is the option key, not the display label.

export type QuestionKey =
  | "age"
  | "nativeLanguage"
  | "level"
  | "topics"
  | "dailyMinutes"
  | "motivation"
  | "fluencyTimeline"
  | "email";

export type AnswerKey = string;

export type FunnelAnswers = Partial<{
  age: AnswerKey;
  nativeLanguage: AnswerKey;
  level: AnswerKey;
  topics: AnswerKey[];
  dailyMinutes: number;
  motivation: number;
  fluencyTimeline: AnswerKey;
  email: string;
}>;
