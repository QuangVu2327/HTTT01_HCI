# Database Schema Plan (Postgres / Supabase)

## 1. Tables

### `projects`
- `id` (uuid, primary key)
- `name` (text, not null)
- `created_at` (timestamp)

### `tasks`
- `id` (uuid, primary key)
- `project_id` (uuid, foreign key -> projects)
- `name` (text, not null)
- `hours` (integer)
- `priority` (text)
- `status` (text)
- `assignee_id` (uuid, foreign key -> members)
- `required_skills` (text[])

### `members`
- `id` (uuid, primary key)
- `project_id` (uuid, foreign key -> projects)
- `name` (text, not null)
- `email` (text)
- `available_hours` (integer)
- `skills` (text[])

## 2. RLS Policies
- Enable RLS on all tables.
- Policies allowing `auth.uid()` to only access rows where `project_id` matches user's projects.
