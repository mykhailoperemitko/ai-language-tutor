import type { FunnelStep } from "./types";

export const FUNNEL_STEPS: readonly FunnelStep[] = [
  {
    type:"question",
    id: "age",
    step: 1,
    answer: {
      type: "single_select",
      options: [
        { key: "under_18" },
        { key: "18_24" },
        { key: "25_34" },
        { key: "35_44" },
        { key: "45_54" },
        { key: "55_plus" },
      ],
    },
  },
  {
    type:"question",
    id: "nativeLanguage",
    step: 2,
    answer: {
      type: "single_select",
      options: [
        { key: "ukrainian" },
        { key: "spanish" },
        { key: "portuguese" },
        { key: "polish" },
        { key: "mandarin" },
        { key: "hindi" },
        { key: "vietnamese" },
        { key: "other" },
      ],
    },
  },
  {
    type: "tutors_reveal",
    id: "tutors_reveal",
    step: 3,
    tutors: [
      { key: "breezy", emoji: "☕" },
      { key: "knox", emoji: "💼" },
      { key: "wren", emoji: "🌍" },
      { key: "vesper", emoji: "🎯" },
    ],
  },
  {
    type:"question",
    id: "level",
    step: 4,
    answer: {
      type: "single_select",
      options: [
        { key: "beginner" },
        { key: "elementary" },
        { key: "intermediate" },
        { key: "upper_intermediate" },
        { key: "advanced" },
      ],
    },
  },
  {
    type:"question",
    id: "topics",
    step: 5,
    answer: {
      type: "multi_select",
      minSelect: 1,
      options: [
        { key: "job_interviews" },
        { key: "small_talk" },
        { key: "work_meetings" },
        { key: "shopping_errands" },
        { key: "dating_friendships" },
        { key: "healthcare_emergencies" },
        { key: "travel_tourism" },
        { key: "phone_video_calls" },
        { key: "news_current_events" },
        { key: "academics" },
      ],
    },
  },
  {
    type:"question",
    id: "dailyMinutes",
    step: 6,
    answer: {
      type: "range_slider",
      min: 5,
      max: 60,
      step: 5,
      defaultValue: 15,
      unit: "min",
    },
  },
  {
    type: "personalization_reveal",
    id: "personalization_reveal",
    step: 7,
  },
  {
    type:"question",
    id: "motivation",
    step: 8,
    answer: {
      type: "number_picker",
      min: 1,
      max: 10,
    },
  },
  {
    type:"question",
    id: "fluencyTimeline",
    step: 9,
    answer: {
      type: "single_select",
      options: [
        { key: "1_month" },
        { key: "3_months" },
        { key: "6_months" },
        { key: "1_year" },
        { key: "no_rush" },
      ],
    },
  },
  {
    type:"question",
    id: "email",
    step: 10,
    answer: { type: "email_input" },
  },
] as const;
