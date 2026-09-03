import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { projectId } = await req.json();

  // 1. Fetch data with joined skills
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, task_skills(skill_id)")
    .eq("project_id", projectId);

  const { data: members } = await supabase
    .from("members")
    .select("*, member_skills(skill_id)")
    .eq("project_id", projectId);

  // 2. Algorithm
  const assignments = [];
  const remainingHoursMap = members.reduce((acc, m) => ({ ...acc, [m.id]: m.available_hours }), {});

  // Sorting tasks (priority + hours)
  const sortedTasks = tasks.sort((a, b) => {
    const priorityWeight = { 'Cao': 3, 'Trung bình': 2, 'Thấp': 1 };
    return (priorityWeight[b.priority] || 2) - (priorityWeight[a.priority] || 2) || b.hours - a.hours;
  });

  for (const task of sortedTasks) {
    const taskSkillIds = task.task_skills.map(ts => ts.skill_id);
    let bestMember = null;
    let bestScore = -1;

    for (const member of members) {
      const memberSkillIds = member.member_skills.map(ms => ms.skill_id);
      
      // Calculate Score
      const skillScore = taskSkillIds.length 
        ? taskSkillIds.filter(id => memberSkillIds.includes(id)).length / taskSkillIds.length 
        : 1.0;
      
      const availabilityScore = remainingHoursMap[member.id] >= task.hours ? 1.0 : (remainingHoursMap[member.id] > 0 ? remainingHoursMap[member.id] / task.hours : 0);
      const totalScore = (0.7 * skillScore + 0.3 * availabilityScore) * 100;

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestMember = member;
      }
    }

    if (bestMember) {
      remainingHoursMap[bestMember.id] -= task.hours;
      assignments.push({ task_id: task.id, member_id: bestMember.id, score: Math.round(bestScore) });
    }
  }

  // 3. Save Assignments
  await supabase.from("assignments").upsert(assignments);
  
  return new Response(JSON.stringify({ message: "Mapping complete", count: assignments.length }), {
    headers: { "Content-Type": "application/json" },
  });
});
