import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getApiUrl } from "@/lib/api";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const response = await fetch(await getApiUrl(`/api/meetings/${id}`), { cache: "no-store" });

  if (!response.ok) {
    notFound();
  }

  const meeting: SacramentMeeting = await response.json();
  return <MeetingDetail meeting={meeting} />;
}