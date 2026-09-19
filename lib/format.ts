import type { MeetingType } from "./types";

export const meetingTypeLabels: Record<MeetingType, string> = {
  testimony: "Testimony meeting",
  regular: "Regular sacrament meeting",
  stake: "Stake meeting",
  general: "General meeting",
  special: "Special meeting",
};

export function formatMeetingDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getCurrentSunday(date = new Date()): string {
  const sunday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  return sunday.toISOString().slice(0, 10);
}