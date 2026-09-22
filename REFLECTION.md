# Project Reflection

## Summary

This project is a sacrament meeting planner built with Next.js App Router, React, TypeScript, Tailwind CSS, and Neon Postgres. The application presents the most recent meeting on the home page, provides a searchable and paginated archive, and lets a user open a detail page for an individual meeting. The project also includes public and admin route groups, API routes for meetings, responsive layouts, loading UI, and a Vercel deployment configuration.

## Challenges and How They Were Solved

The first challenge was moving the meeting data from local application data to a hosted Postgres database. I created a small database access layer in `lib/meetings-db.ts`, used parameterized Neon queries, mapped database column names to the application's TypeScript model, and loaded the connection string from environment variables. This keeps credentials out of the repository and gives the pages one consistent way to retrieve meeting data.

The second challenge was implementing search and pagination without losing the user's URL state. The archive reads `query` and `page` from the URL, passes them to the database functions, and uses the same values when calculating the total number of pages. This makes filtered results bookmarkable and allows browser navigation to work as expected.

Another challenge was adapting the application to the Next.js App Router. I used server components for database-backed pages, route groups to organize public and admin sections without changing the URL, and dynamic route parameters for individual meetings. I also had to be careful with the current Next.js version's asynchronous route parameters and search parameters.

I tested the project with the lint and production build commands. I also reviewed the pages at different viewport sizes to check that the navigation, meeting cards, search controls, pagination, and meeting details remain readable on smaller screens. The database-backed pages require the configured Neon environment variable to run successfully.

## How AI Was Used

AI was used as a development assistant, not as a replacement for understanding or testing the project. I used it to:

- explain Next.js App Router concepts, including server components, route groups, dynamic routes, and asynchronous `searchParams`;
- suggest a structure for the database access layer and help check SQL query and TypeScript typing details;
- help troubleshoot environment-variable and Vercel deployment setup;
- review the search, pagination, responsive layout, and accessibility decisions;
- identify likely lint, type, and build issues before I ran the project checks; and
- improve wording and organization in the documentation.

I reviewed each suggested change, adapted it to the project, and verified the resulting behavior with the development tools. The final implementation decisions, database setup, testing, and deployment configuration remain my responsibility.

## Future Improvements

The next improvement would be to complete the admin create, update, and delete operations. The current database layer intentionally leaves those operations for the next assignment stage, while the public meeting archive and detail views are implemented for this version.