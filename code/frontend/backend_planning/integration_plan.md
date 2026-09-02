# Integration Plan (Frontend to Backend)

## 1. Phase 1: Preparation
- Setup Supabase project.
- Create DB Schema.

## 2. Phase 2: Backend Logic
- Deploy Edge Functions.
- Setup Environment Variables (RESEND_API_KEY).

## 3. Phase 3: Frontend Migration
- Install `@supabase/supabase-js`.
- Replace `useState` with `supabase.from('tasks').select('*')` etc.
- Call Edge Functions for mapping and notifications.
- Enable Realtime subscriptions.
