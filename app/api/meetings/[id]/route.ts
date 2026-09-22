import { getMeetingById } from "@/lib/meetings-db";

interface MeetingRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: MeetingRouteContext) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    return Response.json({ error: "Meeting id must be a positive integer." }, { status: 400 });
  }

  let meeting;
  try {
    meeting = await getMeetingById(meetingId);
  } catch (error) {
    console.error("Unable to load meeting", error);
    return Response.json({ error: "Unable to load meeting." }, { status: 500 });
  }

  if (!meeting) {
    return Response.json({ error: "Meeting not found." }, { status: 404 });
  }

  return Response.json(meeting);
}