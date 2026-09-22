import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query") ?? "";
  const date = searchParams.get("date");
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: "Date must use YYYY-MM-DD format." }, { status: 400 });
  }

  if (date) {
    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
      return Response.json({ error: "Date must be a valid calendar date." }, { status: 400 });
    }
  }

  try {
    return Response.json(await getMeetings(query, currentPage, date));
  } catch (error) {
    console.error("Unable to load meetings", error);
    return Response.json({ error: "Unable to load meetings." }, { status: 500 });
  }
}