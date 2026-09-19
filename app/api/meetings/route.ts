import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query") ?? "";
  const date = searchParams.get("date");
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  return Response.json(await getMeetings(query, currentPage, date));
}