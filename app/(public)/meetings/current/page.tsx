import { redirect } from "next/navigation";
import { getCurrentSunday } from "@/lib/format";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
  const currentSunday = getCurrentSunday();
  const meeting = (await getMeetings("", 1, currentSunday))[0];
  redirect(meeting ? `/meetings/${meeting.id}` : "/meetings");
}