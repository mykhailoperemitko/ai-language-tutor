import type { TFunction } from "i18next";
import type { FunnelAnswers, FunnelStep, FunnelSubmission } from "./types";

export function getFunnelSteps(
  t: TFunction<"funnel">,
  answers: FunnelAnswers,
): FunnelStep[] {
  const dailyMinutes = answers.dailyMinutes ?? 15;

  const dailyMinutesTagLines = t("dailyMinutes.tagLines", {
    returnObjects: true,
  }) as string[];

  const dailyMinutesTagIndex = [5, 15, 30, Infinity].findIndex(
    (max) => dailyMinutes <= max,
  );

  const dailyMinutesTag = dailyMinutesTagLines[dailyMinutesTagIndex] ?? "";

  const motivation = answers.motivation ?? 3;

  const motivationTagLines = t("motivation.tagLines", {
    returnObjects: true,
  }) as string[];

  const motivationTagIndex = [2, 3, 4, Infinity].findIndex(
    (max) => motivation <= max,
  );

  const motivationTag = motivationTagLines[motivationTagIndex] ?? "";

  const levelLabel = answers.level
    ? t(`level.options.${answers.level}.title`)
    : t("common.defaultLevel");

  const topicsLabel =
    answers.topics && answers.topics.length > 0
      ? answers.topics
          .slice(0, 3)
          .map((topic) => t(`topics.options.${topic}.title`))
          .join(", ")
      : t("common.defaultTopics");

  const emailHighlight = answers.fluencyTimeline
    ? t(`email.headingHighlights.${answers.fluencyTimeline}`, t("email.headingHighlights.default"))
    : t("email.headingHighlights.default");

  const personalizationBullets = t("personalization_reveal.bullets", {
    returnObjects: true,
  }) as string[];

  return [
    {
      type: "question",
      key: "age",
      heading: t("age.heading"),
      subheading: t("age.subheading"),
      answer: {
        type: "single_select",
        options: [
          {
            key: "under_18",
            title: t("age.options.under_18.title"),
            subtitle: t("age.options.under_18.subtitle"),
            emoji: "🧒",
          },
          {
            key: "18_24",
            title: t("age.options.18_24.title"),
            subtitle: t("age.options.18_24.subtitle"),
            emoji: "🎓",
          },
          {
            key: "25_34",
            title: t("age.options.25_34.title"),
            subtitle: t("age.options.25_34.subtitle"),
            emoji: "🚀",
          },
          {
            key: "35_44",
            title: t("age.options.35_44.title"),
            subtitle: t("age.options.35_44.subtitle"),
            emoji: "🧠",
          },
          {
            key: "45_54",
            title: t("age.options.45_54.title"),
            subtitle: t("age.options.45_54.subtitle"),
            emoji: "🎯",
          },
          {
            key: "55_plus",
            title: t("age.options.55_plus.title"),
            subtitle: t("age.options.55_plus.subtitle"),
            emoji: "🌟",
          },
        ],
      },
    },
    {
      type: "question",
      key: "nativeLanguage",
      heading: t("nativeLanguage.heading"),
      subheading: t("nativeLanguage.subheading"),
      answer: {
        type: "single_select",
        options: [
          { key: "spanish", title: t("nativeLanguage.options.spanish.title") },
          { key: "hindi", title: t("nativeLanguage.options.hindi.title") },
          {
            key: "mandarin",
            title: t("nativeLanguage.options.mandarin.title"),
          },
          { key: "tagalog", title: t("nativeLanguage.options.tagalog.title") },
          {
            key: "vietnamese",
            title: t("nativeLanguage.options.vietnamese.title"),
          },
          { key: "korean", title: t("nativeLanguage.options.korean.title") },
          {
            key: "portuguese",
            title: t("nativeLanguage.options.portuguese.title"),
          },
          { key: "other", title: t("nativeLanguage.options.other.title") },
        ],
      },
    },
    {
      type: "tutors_reveal",
      key: "tutors_reveal",
      heading: t("tutors_reveal.heading"),
      body: t("tutors_reveal.body"),
      ctaLabel: t("tutors_reveal.ctaLabel"),
      tutors: [
        {
          key: "breezy",
          imageSrc: "/tutors/breezy.png",
          name: t("tutors_reveal.tutors.breezy.name"),
          description: t("tutors_reveal.tutors.breezy.description"),
          badge: t("tutors_reveal.tutors.breezy.badge"),
        },
        {
          key: "knox",
          imageSrc: "/tutors/knox.png",
          name: t("tutors_reveal.tutors.knox.name"),
          description: t("tutors_reveal.tutors.knox.description"),
          badge: t("tutors_reveal.tutors.knox.badge"),
        },
        {
          key: "wren",
          imageSrc: "/tutors/wren.png",
          name: t("tutors_reveal.tutors.wren.name"),
          description: t("tutors_reveal.tutors.wren.description"),
          badge: t("tutors_reveal.tutors.wren.badge"),
        },
        {
          key: "vesper",
          imageSrc: "/tutors/vesper.png",
          name: t("tutors_reveal.tutors.vesper.name"),
          description: t("tutors_reveal.tutors.vesper.description"),
          badge: t("tutors_reveal.tutors.vesper.badge"),
        },
      ],
    },
    {
      type: "question",
      key: "level",
      heading: t("level.heading"),
      subheading: t("level.subheading"),
      answer: {
        type: "single_select",
        options: [
          {
            key: "beginner",
            title: t("level.options.beginner.title"),
            subtitle: t("level.options.beginner.subtitle"),
            emoji: "🌱",
          },
          {
            key: "elementary",
            title: t("level.options.elementary.title"),
            subtitle: t("level.options.elementary.subtitle"),
            emoji: "🧩",
          },
          {
            key: "intermediate",
            title: t("level.options.intermediate.title"),
            subtitle: t("level.options.intermediate.subtitle"),
            emoji: "💬",
          },
          {
            key: "upper_intermediate",
            title: t("level.options.upper_intermediate.title"),
            subtitle: t("level.options.upper_intermediate.subtitle"),
            emoji: "📈",
          },
          {
            key: "advanced",
            title: t("level.options.advanced.title"),
            subtitle: t("level.options.advanced.subtitle"),
            emoji: "🦅",
          },
        ],
      },
    },
    {
      type: "question",
      key: "topics",
      heading: t("topics.heading"),
      subheading: t("topics.subheading"),
      answer: {
        type: "multi_select",
        minSelect: 1,
        countSelectedLabel: t("common.countSelected", {
          count: answers.topics?.length ?? 0,
        }),
        continueLabel: t("common.continue"),
        pickAtLeastLabel: t("common.pickAtLeast", { min: 1 }),
        options: [
          {
            key: "job_interviews",
            title: t("topics.options.job_interviews.title"),
            emoji: "💼",
          },
          {
            key: "small_talk",
            title: t("topics.options.small_talk.title"),
            emoji: "🗣️",
          },
          {
            key: "work_meetings",
            title: t("topics.options.work_meetings.title"),
            emoji: "📊",
          },
          {
            key: "shopping_errands",
            title: t("topics.options.shopping_errands.title"),
            emoji: "🛍️",
          },
          {
            key: "dating_friendships",
            title: t("topics.options.dating_friendships.title"),
            emoji: "❤️",
          },
          {
            key: "healthcare_emergencies",
            title: t("topics.options.healthcare_emergencies.title"),
            emoji: "🚑",
          },
          {
            key: "travel_tourism",
            title: t("topics.options.travel_tourism.title"),
            emoji: "✈️",
          },
          {
            key: "academics",
            title: t("topics.options.academics.title"),
            emoji: "📚",
          },
        ],
      },
    },
    {
      type: "question",
      key: "dailyMinutes",
      heading: t("dailyMinutes.heading"),
      subheading: t("dailyMinutes.subheading"),
      answer: {
        type: "range_slider",
        min: 5,
        max: 60,
        step: 5,
        defaultValue: 15,
        unit: "min",
        unitLabel: t("dailyMinutes.unitLabel"),
        ctaLabel: t("dailyMinutes.ctaLabel"),
        tag: dailyMinutesTag,
      },
    },
    {
      type: "personalization_reveal",
      key: "personalization_reveal",
      chipLabel: t("common.planTakingShape"),
      heading: t("personalization_reveal.heading"),
      body: t("personalization_reveal.bodyTemplate", {
        level: levelLabel,
        topics: topicsLabel,
        dailyMinutes,
      }),
      ctaLabel: t("personalization_reveal.ctaLabel"),
      bulletsHeading: t("personalization_reveal.bulletsHeading"),
      bullets: personalizationBullets,
      highlights: [
        { emoji: "🎯", label: "Level", value: levelLabel },
        { emoji: "💬", label: "Topics", value: topicsLabel },
        { emoji: "⏱️", label: "Daily", value: `${dailyMinutes} min` },
      ],
    },
    {
      type: "question",
      key: "motivation",
      heading: t("motivation.heading"),
      answer: {
        type: "number_picker",
        min: 1,
        max: 5,
        labelMin: t("motivation.labelMin"),
        labelMax: t("motivation.labelMax"),
        continueLabel: t("motivation.continueLabel"),
        tag: motivationTag,
      },
    },
    {
      type: "question",
      key: "fluencyTimeline",
      heading: t("fluencyTimeline.heading"),
      subheading: t("fluencyTimeline.subheading"),
      answer: {
        type: "single_select",
        options: [
          {
            key: "1_month",
            title: t("fluencyTimeline.options.1_month.title"),
            subtitle: t("fluencyTimeline.options.1_month.subtitle"),
            emoji: "⚡",
          },
          {
            key: "3_months",
            title: t("fluencyTimeline.options.3_months.title"),
            subtitle: t("fluencyTimeline.options.3_months.subtitle"),
            emoji: "🔥",
          },
          {
            key: "6_months",
            title: t("fluencyTimeline.options.6_months.title"),
            subtitle: t("fluencyTimeline.options.6_months.subtitle"),
            emoji: "📆",
          },
          {
            key: "1_year",
            title: t("fluencyTimeline.options.1_year.title"),
            subtitle: t("fluencyTimeline.options.1_year.subtitle"),
            emoji: "🌱",
          },
          {
            key: "no_rush",
            title: t("fluencyTimeline.options.no_rush.title"),
            subtitle: t("fluencyTimeline.options.no_rush.subtitle"),
            emoji: "🧘",
          },
        ],
      },
    },
    {
      type: "question",
      key: "email",
      heading: "",
      subheading: t("email.subheading"),
      headingHighlight: emailHighlight,
      answer: {
        type: "email_input",
        label: t("email.label"),
        placeholder: t("email.placeholder"),
        legalNote: t("email.legalNote"),
        ctaLabel: t("email.ctaLabel"),
        submittingLabel: t("email.submittingLabel"),
      },
    },
  ];
}

export function buildSubmission(
  answers: FunnelAnswers,
  email: string,
): FunnelSubmission | null {
  const {
    age,
    nativeLanguage,
    level,
    topics,
    dailyMinutes,
    motivation,
    fluencyTimeline,
  } = answers;

  if (
    typeof age !== "string" ||
    typeof nativeLanguage !== "string" ||
    typeof level !== "string" ||
    !Array.isArray(topics) ||
    topics.length === 0 ||
    topics.some((topic) => typeof topic !== "string") ||
    typeof dailyMinutes !== "number" ||
    typeof motivation !== "number" ||
    typeof fluencyTimeline !== "string"
  ) {
    return null;
  }

  return {
    age,
    nativeLanguage,
    level,
    topics,
    dailyMinutes,
    motivation,
    fluencyTimeline,
    email,
  };
}
