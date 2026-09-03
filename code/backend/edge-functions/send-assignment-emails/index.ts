import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { assignments, managerName } = await req.json();

    if (!assignments || !Array.isArray(assignments)) {
      throw new Error("Missing assignments data");
    }

    const results = [];

    for (const assignment of assignments) {
      try {
      const data = await resend.emails.send({
        from: 'Assignment System <onboarding@resend.dev>',
        to: [assignment.memberEmail || assignment.email],
        subject: 'Bạn có nhiệm vụ mới từ hệ thống phân công!',
        html: `<p>Chào ${assignment.memberName || 'Thành viên'},</p>
               <p>Quản lý ${managerName || 'Dự án'} đã phân công cho bạn task: <strong>${assignment.taskName || 'Nhiệm vụ'}</strong>.</p>
               <p>Thời gian dự kiến: ${assignment.taskHours || 4} giờ.</p>
               <br>
               <p>Đây là thông báo tự động từ hệ thống.</p>`
      });

        results.push({ email: assignment.memberEmail || assignment.email, status: 'sent', data });
      } catch (error) {
        results.push({ email: assignment.memberEmail || assignment.email, status: 'failed', error: error.message });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
