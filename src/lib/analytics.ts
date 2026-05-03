import { getApps, initializeApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const Event = {
  FUNNEL_STARTED: "funnel_started",
  STEP_VIEWED: "funnel_step_viewed",
  STEP_COMPLETED: "funnel_step_completed",
  NAVIGATED_BACK: "funnel_back_navigated",
  EMAIL_SUBMITTED: "funnel_email_submitted",
  SUBMISSION_SUCCEEDED: "funnel_submission_succeeded",
  SUBMISSION_FAILED: "funnel_submission_failed",
  DROPPED: "funnel_dropped",
} as const;

let analytics: Analytics | null = null;

function getAnalyticsInstance(): Analytics | null {
  if (typeof window === "undefined") return null;
  if (!firebaseConfig.apiKey) return null;

  if (!analytics) {
    const apps = getApps();
    const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
  }
  return analytics;
}

function log(event: string, params?: Record<string, string | number>): void {
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, params);
  }
  const a = getAnalyticsInstance();
  if (!a) return;
  logEvent(a, event, params);
}

export function logFunnelStarted(): void {
  log(Event.FUNNEL_STARTED);
}

export function logStepViewed(
  stepIndex: number,
  stepName: string,
  stepType: string,
): void {
  log(Event.STEP_VIEWED, {
    step_index: stepIndex,
    step_name: stepName,
    step_type: stepType,
  });
}

export function logStepCompleted(stepIndex: number, stepName: string): void {
  log(Event.STEP_COMPLETED, { step_index: stepIndex, step_name: stepName });
}

export function logNavigatedBack(
  fromStepIndex: number,
  fromStepName: string,
): void {
  log(Event.NAVIGATED_BACK, {
    from_step_index: fromStepIndex,
    from_step_name: fromStepName,
  });
}

export function logEmailSubmitted(): void {
  log(Event.EMAIL_SUBMITTED);
}

export function logSubmissionSucceeded(): void {
  log(Event.SUBMISSION_SUCCEEDED);
}

export function logSubmissionFailed(error: string): void {
  log(Event.SUBMISSION_FAILED, { error });
}

export function logDrop(stepIndex: number, stepName: string): void {
  log(Event.DROPPED, {
    last_step_index: stepIndex,
    last_step_name: stepName,
  });
}
