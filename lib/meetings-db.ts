import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;

type SqlClient = ReturnType<typeof neon>;
let sql: SqlClient | undefined;

function getSql(): SqlClient {
  if (!sql) {
    const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL;
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
  const rows = (await getSql()`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${JSON.stringify(data.announcements ?? [])},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness ?? [])},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers ?? [])},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING
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
  `) as unknown as SacramentMeeting[];

  const meeting = rows[0];
  if (!meeting) {
    throw new Error("Failed to create meeting.");
  }

  return meeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  if (Object.keys(updates).length === 0) {
    return getMeetingById(id);
  }

  const updatePairs: Array<[string, unknown]> = [];

  if (updates.date !== undefined) updatePairs.push(["date", updates.date]);
  if (updates.meetingType !== undefined) updatePairs.push(["meeting_type", updates.meetingType]);
  if (updates.presiding !== undefined) updatePairs.push(["presiding", updates.presiding]);
  if (updates.conducting !== undefined) updatePairs.push(["conducting", updates.conducting]);
  if (updates.announcements !== undefined) updatePairs.push(["announcements", JSON.stringify(updates.announcements)]);
  if (updates.openingHymn !== undefined) updatePairs.push(["opening_hymn", JSON.stringify(updates.openingHymn)]);
  if (updates.openingPrayer !== undefined) updatePairs.push(["opening_prayer", updates.openingPrayer]);
  if (updates.wardBusiness !== undefined) updatePairs.push(["ward_business", JSON.stringify(updates.wardBusiness)]);
  if (updates.stakeBusiness !== undefined) updatePairs.push(["stake_business", updates.stakeBusiness]);
  if (updates.sacramentHymn !== undefined) updatePairs.push(["sacrament_hymn", JSON.stringify(updates.sacramentHymn)]);
  if (updates.speakers !== undefined) updatePairs.push(["speakers", JSON.stringify(updates.speakers)]);
  if (updates.closingHymn !== undefined) updatePairs.push(["closing_hymn", JSON.stringify(updates.closingHymn)]);
  if (updates.closingPrayer !== undefined) updatePairs.push(["closing_prayer", updates.closingPrayer]);

  for (const [column, value] of updatePairs) {
    await getSql()`
      UPDATE meetings
      SET ${column} = ${value}
      WHERE id = ${id}
    `;
  }

  return getMeetingById(id);
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = (await getSql()`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `) as Array<{ id: number }>;

  return rows.length > 0;
}