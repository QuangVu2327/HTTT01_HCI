# API Design (Supabase Edge Functions)

## 1. Mapping Engine
- **Endpoint**: `POST /functions/v1/map-tasks`
- **Logic**:
  - Receive `project_id`.
  - Fetch all `tasks` and `members` for the project.
  - Run `runAutoAssignment` algorithm.
  - Update `tasks` table with new `assignee_id`s.
  - Return the assignment results.

## 2. Notification Service
- **Endpoint**: `POST /functions/v1/send-notifications`
- **Logic**:
  - Receive `project_id`.
  - Fetch assigned tasks and member emails.
  - Integrate with Resend SDK to send email notifications.
