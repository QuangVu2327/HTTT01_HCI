## Table `members`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `name` | `text` |  |
| `email` | `text` |  |
| `available_hours` | `int4` |  Nullable |
| `project_id` | `uuid` |  Nullable |
| `tags` | `_text` |  Nullable |

## Table `projects`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `text` |  |
| `created_at` | `timestamptz` |  Nullable |

## Table `profiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `full_name` | `text` |  Nullable |

## Table `project_members`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `project_id` | `uuid` | Primary |
| `user_id` | `uuid` | Primary |
| `role` | `text` |  Nullable |

## Table `tasks`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `project_id` | `uuid` |  Nullable |
| `name` | `text` |  |
| `hours` | `int4` |  Nullable |
| `priority` | `text` |  Nullable |
| `status` | `text` |  Nullable |
| `tags` | `_text` |  Nullable |
| `assignee_id` | `int8` |  Nullable |

## Table `skill_pool`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `name` | `text` |  |
| `project_id` | `uuid` |  Nullable |

## RLS Policies

### `projects`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Users can view own projects` | SELECT | public | PERMISSIVE | `(EXISTS ( SELECT 1    FROM project_members   WHERE ((project_members.project_id = projects.id) AND (project_members.user_id = auth.uid()))))` | — |

### `tasks`

| Policy | Command | Roles | Action | USING | WITH CHECK |
|--------|---------|-------|--------|-------|------------|
| `Managers can modify tasks` | ALL | public | PERMISSIVE | `(EXISTS ( SELECT 1    FROM project_members   WHERE ((project_members.project_id = tasks.project_id) AND (project_members.user_id = auth.uid()) AND (project_members.role = 'Manager'::text))))` | — |
| `Members can view tasks` | SELECT | public | PERMISSIVE | `(EXISTS ( SELECT 1    FROM project_members   WHERE ((project_members.project_id = tasks.project_id) AND (project_members.user_id = auth.uid()))))` | — |

