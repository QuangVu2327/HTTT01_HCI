import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body = await req.json().catch(() => ({}));
    const projectId = body.projectId || 'default-project-id';

    // 1. Fetch data
    const { data: tasks, error: taskError } = await supabase
      .from("tasks")
      .select("*");

    if (taskError) throw taskError;

    const { data: members, error: memberError } = await supabase
      .from("members")
      .select("*");

    if (memberError) throw memberError;

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Edge function run-mapping executed successfully",
      tasksCount: tasks?.length || 0,
      membersCount: members?.length || 0
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
