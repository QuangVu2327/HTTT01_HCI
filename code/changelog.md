# Changelog - Code Module (Production Application)

## [2026-09-02] - Security & .gitignore Hardening
- Updated `.gitignore` across root and `code/` module to strictly exclude sensitive environment files (`.env`, `env`, `code/env`, `code/frontend/.env`) and build artifacts (`node_modules/`, `dist/`).

## [2026-09-02] - Frontend Integrated Successfully
- Copied and structured the frontend application into `code/frontend/` (React + Vite + Tailwind CSS).
- Configured environment variables (`.env`) and added Supabase client integration (`supabaseClient.js`).
- Successfully executed production build check (`npm run build`) with zero errors.

## [2026-09-02] - Backend Infrastructure Initialized
- Created Supabase database schema (`schema.sql`) for projects, tasks, members, skills, task_skills, member_skills, and assignments.
- Developed Supabase Edge Function (`run-mapping/index.ts`) implementing the Weighted Scoring algorithm (`0.7 * skill + 0.3 * availability`) and Greedy matching.
- Developed Supabase Edge Function (`send-assignment-emails/index.ts`) integrating Resend API for automated batch email notifications.
