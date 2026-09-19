import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);
  if (!Number.isInteger(meetingId) || meetingId < 1) {
    notFound();
  }

  const meeting: SacramentMeeting | null = await getMeetingById(meetingId);
  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}