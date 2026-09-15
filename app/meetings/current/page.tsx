import { redirect } from "next/navigation";
import { getCurrentSunday } from "@/lib/format";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
  const currentSunday = getCurrentSunday();
  const meeting = getMeetings(currentSunday)[0];
  redirect(`/meetings/${meeting?.id ?? 1}`);
}