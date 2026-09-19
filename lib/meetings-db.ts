import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;

type SqlClient = ReturnType<typeof neon>;
let sql: SqlClient | undefined;

function getSql(): SqlClient {
  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required to access meeting data.");
    }
    sql = neon(databaseUrl);
  }
  return sql;
}

function searchPattern(query: string): string {
  return `%${query.trim()}%`;
}

export async function getMeetings(
  query = "",
  currentPage = 1,
  date?: string | null,
): Promise<SacramentMeeting[]> {
  const searchTerm = searchPattern(query);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = (await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE (
      ${query.trim()} = ''
      OR presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    )
    AND (${date ?? null}::date IS NULL OR date = ${date ?? null}::date)
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `) as unknown as SacramentMeeting[];

  return rows;
}

export async function getMeetingsTotalPages(query = ""): Promise<number> {
  const searchTerm = searchPattern(query);
  const rows = (await getSql()`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE
      ${query.trim()} = ''
      OR presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `) as unknown as Array<{ count: string }>;

  return Math.max(1, Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = (await getSql()`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `) as unknown as SacramentMeeting[];

  return rows[0] ?? null;
}

export async function getMostRecentMeeting(): Promise<SacramentMeeting | null> {
  const meetings = await getMeetings("", 1);
  return meetings[0] ?? null;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  void data;
  throw new Error("addMeeting: database implementation coming in Week 04");
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  void id;
  void updates;
  throw new Error("updateMeeting: database implementation coming in Week 04");
}

export async function deleteMeeting(id: number): Promise<boolean> {
  void id;
  throw new Error("deleteMeeting: database implementation coming in Week 04");
}