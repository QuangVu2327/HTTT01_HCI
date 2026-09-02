import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  // Input: assignments array containing member details and task details
  const { assignments, managerName } = await req.json();

  const results = [];

  for (const assignment of assignments) {
    try {
      const data = await resend.emails.send({
        from: 'Assignment System <onboarding@resend.dev>',
        to: [assignment.memberEmail],
        subject: 'Bạn có nhiệm vụ mới!',
        html: `<p>Chào ${assignment.memberName},</p>
               <p>Quản lý ${managerName} đã phân công cho bạn task: <strong>${assignment.taskName}</strong>.</p>
               <p>Thời gian dự kiến: ${assignment.taskHours} giờ.</p>`
      });
      results.push({ email: assignment.memberEmail, status: 'sent', data });
    } catch (error) {
      results.push({ email: assignment.memberEmail, status: 'failed', error });
    }
  }

  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" },
  });
});
