# Links — Evaluation TaskAssign AI

> Tạo: 2026-09-02 19:16 (Asia/Ho_Chi_Minh) — từ Google Apps Script `createEvaluationForm`

## Google Form — Usability Test (gửi cho người tham gia)

| Loại | Link |
|---|---|
| **Form rút gọn (gửi)** | https://forms.gle/5EicsppE4PEVu5Gx7 |
| Form dài | https://docs.google.com/forms/d/e/1FAIpQLSdpNKjCxWvcZxKxluV5rA7JfRO9Q3JcpRMIODEjHZ5-5rZOxw/viewform |
| **Edit (chỉ bạn)** | https://docs.google.com/forms/d/1Ff4srZUC5TkJArk7A3goC06dRleDDSDbuhwHMmXlHOc/edit |
| **Bảng kết quả (Sheet)** | https://docs.google.com/spreadsheets/d/1hiCE2A0wfCxVH7J4bl__3VEcATVlwqfGJwOG64mdP1s/edit |

**TODO:** Mở Edit → thay `YOUR_PROTOTYPE_LINK` trong mô tả Part B thành link prototype thật (Vercel) rồi gửi link rút gọn.

## Prototype & Wireframe (dán vào Form)

- Prototype (local): `prototype/` → `npm run dev` → `http://localhost:5173`
- Prototype (deploy): _chưa deploy — dán link Vercel khi có_
- Wireframe backup: `wireframe/index.html` (mở trực tiếp, không cần server)
- Wireframe export: `wireframe/screens/wireframe-export.png`

## Tài liệu Evaluation trong repo

- Kế hoạch: `evaluation/plan.md` (nguồn chuẩn: `persona/final_persona/data/raw/student_leader_deep.json`)
- Hướng dẫn: `evaluation/skill.md` (bắt buộc dùng final persona, không dùng `personas.md` draft)
- Final persona: `persona/final_persona/data/raw/student_leader_deep.json` + `data/output/student_leader_deep.html|.png`
- Facilitator script: `evaluation/data/raw/facilitator_script.md`
- Self-guided packet: `evaluation/data/raw/evaluation_packet_self_guided.md`
- SUS form: `evaluation/data/raw/sus_form.md`
- Observation sheet: `evaluation/data/raw/observation_sheet.csv`
- Analysis (math): `evaluation/data/output/analysis.md` (tách nhóm khớp cao vs đối chứng)
- Báo cáo nháp: `evaluation/data/output/report.md` (map với final persona)
- Script tạo Form: `evaluation/google_form.gs`

## Báo cáo & Slide liên quan

- Báo cáo: `report/src/main.md` → `report/report.pdf` + `report/report.docx`
- Slide: `slides/src/slides.md` → `slides/slides.pdf` (import Canva)
