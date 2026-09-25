# W03 Team Planning

## Component Architecture

### Routes

- `/` - current meeting overview
- `/meetings` - searchable, paginated meeting archive
- `/meetings/[id]` - complete meeting program
- `/meetings/current` - current Sunday's meeting or archive fallback
- `/meetings/new` - planned administration route for creating a meeting
- `/api/meetings` - meeting list and date-filter endpoint
- `/api/meetings/[id]` - single-meeting endpoint

### Reusable components

- `Header` contains the ward identity and primary navigation.
- `NavLinks` provides active route styling.
- `Footer` provides shared page footer content.
- `MeetingCard` presents one archive result.
- `MeetingSearch` manages URL-based search state.
- `Pagination` manages URL-based page navigation.
- `MeetingDetail` renders the complete meeting program.
- `PrintButton` provides print support for a program.

The highest-priority Week 04 work is to complete meeting creation and add full administration for updating and deleting meetings. Shared types and database functions remain the dependency for those features.

## Data Model

The application currently uses Neon Postgres with one primary `meetings` entity. Structured meeting sections are stored as JSON or arrays in the meeting record.

### Meeting

- `id: number` - primary key
- `date: string` - meeting date in `YYYY-MM-DD` format
- `meetingType: MeetingType` - testimony, regular, stake, general, or special
- `presiding: string`
- `conducting: string`
- `announcements: string[]`
- `openingHymn`, `sacramentHymn`, `closingHymn: Hymn`
- `openingPrayer`, `closingPrayer: string`
- `wardBusiness: WardBusinessItem[]`
- `stakeBusiness: boolean`
- `speakers: SpeakerItem[]`

### Embedded value types

- `Hymn`: `number`, `title`
- `SpeakerItem`: `name`, `topic`, `type`
- `WardBusinessItem`: `description`

### Relationships

One meeting contains many speaker items, many ward-business items, and many announcements. Each meeting contains three hymn values and two prayer values. There are no separate user or organization entities in the current MVP.

## Design Planning

- **Palette:** ink `#1F2A2A`, paper `#F7F4ED`, sage `#72806A`, sun `#E7B84B`, muted text `#6F7771`, and light borders `#D9DDD5`.
- **Typography:** Geist Sans for interface text and Geist Mono for supporting technical text, loaded through `next/font/google`.
- **Layout:** centered content with a maximum width of 6xl, responsive grid layouts, consistent 20px mobile horizontal padding, and larger 32px desktop padding.
- **Visual language:** quiet editorial styling with rectangular borders, restrained shadows, high-contrast ink headings, and a warm accent for calls to action.
- **Responsive behavior:** archive cards become a three-column grid on large screens, two columns on small screens, and a single column on narrow screens; navigation wraps when needed.

## Week 04 Issue Plan

Create a Week 04 milestone and add these issues to the project board:

1. Complete the create-meeting form and validation.
2. Implement database-backed meeting updates.
3. Implement meeting deletion with confirmation.
4. Add editable speaker and musical-number rows.
5. Add editable hymn and prayer fields.
6. Add admin error, loading, and empty states.
7. Add route and database integration tests.
8. Improve README setup instructions and add team documentation.
