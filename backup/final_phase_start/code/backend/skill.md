# Skill: Backend Operational Skills

## Purpose
This skill set covers the maintenance, execution, and troubleshooting of the backend services, including algorithm mapping and notification dispatch.

## When to use this skill
- When updating or refining the mapping algorithm.
- When troubleshooting database schema (including normalized skill tables) or Edge Function errors.
- When managing project-specific email notification settings.

## Required Inputs
- `projectId`: Target project for mapping.
- `taskData`: JSON input for task details.
- `memberData`: JSON input for member details.
- `skillMapping`: Mapping of skill names to `skill_id`.

## Output
- `assignmentResult`: JSON object containing assignments and updated availability.
- `notificationStatus`: Log of success/failure per email.

## Workflow
1. **Prepare Data:** Ensure input tasks and members adhere to the schema, linking via `task_skills`/`member_skills`.
2. **Execute Mapping:** Invoke Edge Function `run-mapping`.
3. **Review Assignments:** Validate mapping logic against project criteria and `assignments` composite key integrity.
4. **Trigger Notifications:** Invoke Edge Function `send-assignment-emails` ONLY after manager confirmation.

## Knowledge & Reasoning
- Mapping uses weighted scoring (0.7 skill, 0.3 availability).
- Greedy strategy: Highest priority/skill task first.
- Security: RLS restricts database access by `project_id`.

## Validation Rules
- `score` total must not exceed 100%.
- `remainingHours` must never be negative.
- Assignments are unique per `(task_id, member_id)`.
- Emails must include `taskName` and `managerName`.
