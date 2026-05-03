export type AnswerOption = {
  key: string;
  title: string;
  subtitle?: string;
  emoji?: string;
};

export type SingleSelect = { type: "single_select"; options: AnswerOption[] };

export type MultiSelect = {
  type: "multi_select";
  options: AnswerOption[];
  minSelect: number;
  countSelectedLabel: string;
  continueLabel: string;
  pickAtLeastLabel: string;
};

export type RangeSlider = {
  type: "range_slider";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  unitLabel: string;
  ctaLabel: string;
  tag: string;
};

export type NumberPicker = {
  type: "number_picker";
  min: number;
  max: number;
  labelMin: string;
  labelMax: string;
  continueLabel: string;
  tag: string;
};

export type EmailInput = {
  type: "email_input";
  label: string;
  placeholder: string;
  legalNote: string;
  ctaLabel: string;
  submittingLabel: string;
};

export type Answer =
  | SingleSelect
  | MultiSelect
  | RangeSlider
  | NumberPicker
  | EmailInput;

export type Tutor = { key: string; emoji: string };
export type TutorCard = Tutor & {
  name: string;
  description: string;
  badge: string;
};

export type Question = {
  type: "question";
  key: QuestionKey;
  heading: string;
  subheading?: string;
  answer: Answer;
};

export type TutorsReveal = {
  type: "tutors_reveal";
  key: "tutors_reveal";
  heading: string;
  body: string;
  ctaLabel: string;
  tutors: TutorCard[];
};

export type PersonalizationReveal = {
  type: "personalization_reveal";
  key: "personalization_reveal";
  chipLabel: string;
  heading: string;
  body: string;
  ctaLabel: string;
  bulletsHeading: string;
  bullets: string[];
};

export type FunnelStep = Question | TutorsReveal | PersonalizationReveal;

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

export type FunnelSubmission = Required<FunnelAnswers>;

export type SubmitResult = { ok: true } | { ok: false; error: string };
