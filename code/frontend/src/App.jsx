import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  Sparkles, 
  Trello, 
  Plus, 
  Trash2, 
  Edit3, 
  Mail, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  Play, 
  Search, 
  X, 
  CheckCircle2, 
  Info,
  Clock,
  ArrowRight,
  Menu
} from 'lucide-react';
import { runAutoAssignment, calculateMatchScore } from './utils/assignmentAlgorithm';
import ScoreTooltip from './components/ScoreTooltip';
import Sidebar from './components/Sidebar';

export default function App() {
  // 1. STATE TOÀN CỤC
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const [skillPool, setSkillPool] = useState([
    "Thiết kế", "Phân tích", "Soạn thảo", "Nghiên cứu", "Thuyết trình", "Tài chính", "Hậu cần", "Lập kế hoạch", "Biên tập"
  ]);
  const [newSkillTag, setNewSkillTag] = useState('');
  
  // Danh sách Tasks
  const [tasks, setTasks] = useState([
    { id: 1, name: "Nghiên cứu thị trường mục tiêu", hours: 8, tags: ["Nghiên cứu", "Phân tích"], priority: "Cao", status: "Doing", assigneeId: 1 },
    { id: 2, name: "Soạn thảo kế hoạch dự án", hours: 10, tags: ["Lập kế hoạch", "Soạn thảo"], priority: "Cao", status: "To Do", assigneeId: null },
    { id: 3, name: "Thiết kế poster & tài liệu truyền thông", hours: 6, tags: ["Thiết kế", "Biên tập"], priority: "Trung bình", status: "To Do", assigneeId: null },
    { id: 4, name: "Chuẩn bị báo cáo tài chính", hours: 5, tags: ["Tài chính", "Phân tích"], priority: "Trung bình", status: "To Do", assigneeId: null },
    { id: 5, name: "Chuẩn bị slide thuyết trình", hours: 4, tags: ["Thuyết trình", "Thiết kế"], priority: "Thấp", status: "Done", assigneeId: 3 }
  ]);
  
  // Danh sách Thành viên
  const [members, setMembers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a.nguyen@example.com", availableHours: 15, tags: ["Thiết kế", "Phân tích"] },
    { id: 2, name: "Trần Thị B", email: "b.tran@example.com", availableHours: 12, tags: ["Phân tích", "Tài chính"] },
    { id: 3, name: "Lê Hoàng C", email: "c.le@example.com", availableHours: 16, tags: ["Soạn thảo", "Nghiên cứu"] },
    { id: 4, name: "Phạm Minh D", email: "d.pham@example.com", availableHours: 10, tags: ["Thiết kế", "Thuyết trình"] }
  ]);

  // Các state tương tác phục vụ Auto-Assignment & Modal
  const [assignmentResults, setAssignmentResults] = useState([]);
  const [isMappingLoading, setIsMappingLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // success | error | info
  const [selectedTaskDetail, setSelectedTaskDetail] = useState(null);
  
  // State phục vụ Form (Add/Edit Task)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ name: '', hours: 4, tags: [], priority: 'Trung bình', status: 'To Do' });
  
  // State phục vụ Form (Add/Edit Member)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({ name: '', email: '', availableHours: 10, tags: [] });

  // State Tìm kiếm & Bộ lọc
  const [taskSearch, setTaskSearch] = useState('');
  const [taskFilterTag, setTaskFilterTag] = useState('Tất cả');
  const [memberSearch, setMemberSearch] = useState('');

  // 2. TÍNH TOÁN STATS & SỰ QUÁ TẢI (LIVE WORKLOADS)
  const [workloads, setWorkloads] = useState({});
  const [overloads, setOverloads] = useState([]);

  useEffect(() => {
    // Tính tổng giờ làm việc được gán cho từng người hiện tại
    const currentWorkloads = {};
    members.forEach(m => {
      currentWorkloads[m.id] = 0;
    });
    tasks.forEach(t => {
      if (t.assigneeId) {
        currentWorkloads[t.assigneeId] = (currentWorkloads[t.assigneeId] || 0) + t.hours;
      }
    });
    setWorkloads(currentWorkloads);

    // Xác định người quá tải
    const currentOverloads = [];
    members.forEach(m => {
      const assigned = currentWorkloads[m.id] || 0;
      if (assigned > m.availableHours) {
        currentOverloads.push({
          id: m.id,
          name: m.name,
          assigned,
          limit: m.availableHours,
          excess: assigned - m.availableHours
        });
      }
    });
    setOverloads(currentOverloads);
  }, [tasks, members]);

  // Trigger Toast Alert Helper
  const triggerToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 3. XỬ LÝ SỰ KIỆN QUẢN LÝ KỸ NĂNG (GLOBAL POOL)
  const handleAddGlobalSkill = (e) => {
    e.preventDefault();
    if (!newSkillTag.trim()) return;
    if (skillPool.includes(newSkillTag.trim())) {
      triggerToast("Kỹ năng này đã tồn tại trong Pool!", "info");
      return;
    }
    setSkillPool([...skillPool, newSkillTag.trim()]);
    setNewSkillTag('');
    triggerToast("Đã thêm kỹ năng mới thành công!");
  };

  const handleRemoveGlobalSkill = (skillToDelete) => {
    // Check if any task or member is currently using this skill tag
    const isUsedInTasks = tasks.some(t => t.tags.includes(skillToDelete));
    const isUsedInMembers = members.some(m => m.tags.includes(skillToDelete));
    if (isUsedInTasks || isUsedInMembers) {
      if (!window.confirm(`Kỹ năng "${skillToDelete}" đang được sử dụng bởi một số Task hoặc Thành viên. Bạn có chắc chắn muốn xóa không?`)) {
        return;
      }
    }
    setSkillPool(skillPool.filter(s => s !== skillToDelete));
    triggerToast("Đã xóa kỹ năng khỏi Pool hệ thống.");
  };

  // 4. CRUD OPERATIONS CHO TASK
  const handleOpenAddTask = () => {
    setEditingTask(null);
    setTaskForm({ name: '', hours: 4, tags: [], priority: 'Trung bình', status: 'To Do' });
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({ ...task });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskForm.name.trim()) {
      triggerToast("Vui lòng điền tên công việc!", "error");
      return;
    }
    if (editingTask) {
      // Sửa
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...taskForm } : t));
      triggerToast("Đã cập nhật công việc!");
    } else {
      // Thêm mới
      const newTask = {
        id: Date.now(),
        ...taskForm,
        assigneeId: null // Mặc định chưa gán
      };
      setTasks([...tasks, newTask]);
      triggerToast("Đã thêm công việc mới!");
    }
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      setTasks(tasks.filter(t => t.id !== id));
      triggerToast("Đã xóa công việc khỏi danh sách.");
    }
  };

  const handleToggleTaskTag = (tag) => {
    const isSelected = taskForm.tags.includes(tag);
    if (isSelected) {
      setTaskForm({ ...taskForm, tags: taskForm.tags.filter(t => t !== tag) });
    } else {
      setTaskForm({ ...taskForm, tags: [...taskForm.tags, tag] });
    }
  };

  // 5. CRUD OPERATIONS CHO THÀNH VIÊN
  const handleOpenAddMember = () => {
    setEditingMember(null);
    setMemberForm({ name: '', email: '', availableHours: 10, tags: [] });
    setIsMemberModalOpen(true);
  };

  const handleOpenEditMember = (member) => {
    setEditingMember(member);
    setMemberForm({ ...member });
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.email.trim()) {
      triggerToast("Vui lòng nhập đầy đủ Tên và Email!", "error");
      return;
    }
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...memberForm } : m));
      triggerToast("Đã cập nhật thông tin thành viên!");
    } else {
      const newMember = {
        id: Date.now(),
        ...memberForm
      };
      setMembers([...members, newMember]);
      triggerToast("Đã thêm thành viên mới!");
    }
    setIsMemberModalOpen(false);
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
      setMembers(members.filter(m => m.id !== id));
      // Reset gán việc của thành viên này trong danh sách tasks
      setTasks(tasks.map(t => t.assigneeId === id ? { ...t, assigneeId: null } : t));
      triggerToast("Đã xóa thành viên.");
    }
  };

  const handleToggleMemberTag = (tag) => {
    const isSelected = memberForm.tags.includes(tag);
    if (isSelected) {
      setMemberForm({ ...memberForm, tags: memberForm.tags.filter(t => t !== tag) });
    } else {
      setMemberForm({ ...memberForm, tags: [...memberForm.tags, tag] });
    }
  };

  // Import mock CSV helpers
  const handleImportMockTasks = () => {
    const mockCSVTasks = [
      { id: 101, name: "Khảo sát người dùng", hours: 6, tags: ["Nghiên cứu", "Phân tích"], priority: "Cao", status: "To Do", assigneeId: null },
      { id: 102, name: "Viết nội dung truyền thông", hours: 10, tags: ["Soạn thảo", "Biên tập"], priority: "Cao", status: "To Do", assigneeId: null },
      { id: 103, name: "Lập kế hoạch hậu cần", hours: 8, tags: ["Hậu cần", "Lập kế hoạch"], priority: "Trung bình", status: "To Do", assigneeId: null },
    ];
    setTasks([...tasks, ...mockCSVTasks]);
    triggerToast("Đã import thành công 3 công việc mẫu từ CSV giả lập!");
  };

  const handleImportMockMembers = () => {
    const mockCSVMembers = [
      { id: 101, name: "Vũ Thị E", email: "e.vu@example.com", availableHours: 15, tags: ["Thiết kế", "Thuyết trình"] },
      { id: 102, name: "Đỗ Hoàng F", email: "f.do@example.com", availableHours: 20, tags: ["Tài chính", "Phân tích", "Lập kế hoạch"] }
    ];
    setMembers([...members, ...mockCSVMembers]);
    triggerToast("Đã import thành công 2 nhân sự mẫu từ CSV giả lập!");
  };


  // 6. XỬ LÝ CHẠY THUẬT TOÁN TỰ ĐỘNG PHÂN CÔNG (AUTO-ASSIGNMENT)
  const handleTriggerAutoAssignment = () => {
    setIsMappingLoading(true);
    setLoadingStep(0);
    
    // Giả lập loading mượt, từng bước của thuật toán để thể hiện "tương tác mới độc đáo"
    const steps = [
      "Đang quét danh sách kỹ năng yêu cầu...",
      "Đang phân tích quỹ thời gian khả dụng của thành viên...",
      "Đang chạy thuật toán Weighted Scoring (Trọng số 70% Skill, 30% Time)...",
      "Đang phân phối công việc tối ưu bằng thuật toán Greedy Match...",
      "Hoàn tất tính toán phân phối công việc!"
    ];

    const timer = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          // Thực hiện thuật toán thực tế
          const result = runAutoAssignment(tasks, members);
          setAssignmentResults(result.assignments);
          
          // Cập nhật lại assigneeId trong danh sách tasks gốc dựa trên kết quả đề xuất
          const updatedTasks = tasks.map(t => {
            const proposed = result.assignments.find(a => a.taskId === t.id);
            return proposed ? { ...t, assigneeId: proposed.memberId } : t;
          });
          setTasks(updatedTasks);
          
          setIsMappingLoading(false);
          triggerToast("Hệ thống đã tự động tính toán và đề xuất phương án tối ưu nhất!");
          return 0;
        }
      });
    }, 450);
  };

  // 7. MANUAL OVERRIDE (ĐIỀU CHỈNH THỦ CÔNG)
  const handleManualOverride = (taskId, newMemberId) => {
    const updatedAssigneeId = newMemberId === "" ? null : Number(newMemberId);
    
    // Cập nhật trong danh sách tasks chính
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, assigneeId: updatedAssigneeId } : t);
    setTasks(updatedTasks);

    // Cập nhật trong bảng Preview kết quả nếu đang hiển thị
    if (assignmentResults.length > 0) {
      const updatedResults = assignmentResults.map(res => {
        if (res.taskId === taskId) {
          const m = members.find(mem => mem.id === updatedAssigneeId);
          // Tính toán lại điểm số tương thích của người mới
          let scores = { skillScore: 0, availabilityScore: 0, totalScore: 0 };
          if (m) {
            // Giả lập một remaining map tạm thời cho việc tính score đơn lẻ
            const tempMap = {};
            members.forEach(mem => { tempMap[mem.id] = mem.availableHours; });
            scores = calculateMatchScore(tasks.find(t => t.id === taskId), m, tempMap);
          }
          return {
            ...res,
            memberId: updatedAssigneeId,
            memberName: m ? m.name : 'Chưa phân công',
            memberEmail: m ? m.email : '',
            scores
          };
        }
        return res;
      });
      setAssignmentResults(updatedResults);
    }
    triggerToast("Đã ghi nhận điều chỉnh thủ công của Quản lý!", "info");
  };

  // 8. SIMULATING EMAIL NOTIFICATIONS VIA RESEND API
  const handleConfirmSendEmails = () => {
    setIsResendModalOpen(false);
    triggerToast("Đang chuẩn bị gửi email qua cổng Resend API...", "info");
    
    setTimeout(() => {
      triggerToast("Đã gửi thông báo email thành công đến " + members.length + " thành viên liên quan!", "success");
    }, 1500);
  };


  // Bộ lọc dữ liệu phục vụ UI hiển thị
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesTag = taskFilterTag === 'Tất cả' || t.tags.includes(taskFilterTag);
    return matchesSearch && matchesTag;
  });

  const filteredMembers = members.filter(m => {
    return m.name.toLowerCase().includes(memberSearch.toLowerCase()) || m.email.toLowerCase().includes(memberSearch.toLowerCase());
  });

  return (
    <div className="min-h-screen flex bg-atlassian-bg">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-white border-b border-atlassian-border px-6 py-4 flex items-center justify-between shadow-sm">
            <h2 className="text-xl font-bold text-atlassian-text uppercase tracking-wider">
                {activeTab === 'dashboard' ? 'Tổng quan' : activeTab === 'tasks' ? 'Tasks' : activeTab === 'members' ? 'Nhân sự' : activeTab === 'assignment' ? 'Phân công AI' : 'Kanban'}
            </h2>
            <div className="flex items-center space-x-3">
                <span className="text-[13px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">Phase 1 Active</span>
                <div className="w-8 h-8 rounded-full bg-atlassian-blue flex items-center justify-center text-white font-bold">MA</div>
            </div>
        </header>

      {/* THÔNG BÁO TOAST */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl animate-bounce">
          {toastType === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toastType === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
          {toastType === 'info' && <Info className="w-5 h-5 text-sky-400" />}
          <span className="text-base font-medium">{toastMessage}</span>
        </div>
      )}

      {/* CẢNH BÁO QUÁ TẢI (LIVE WARNING PANEL) */}
      {overloads.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between text-amber-900">
          <div className="flex items-center space-x-2 text-base">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              <strong>Cảnh báo phân bổ lực lượng:</strong> Phát hiện <strong>{overloads.length} nhân viên</strong> bị quá tải tải lượng công việc.
            </span>
          </div>
          <button 
            onClick={() => setActiveTab('assignment')} 
            className="text-[13px] bg-amber-600 text-white font-semibold px-3 py-1.5 rounded hover:bg-amber-700 shrink-0"
          >
            Điều chỉnh Ngay
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6">
        
        {/* TABS 1: DASHBOARD TỔNG QUAN */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* GIỚI THIỆU & THỐNG KÊ NHANH */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-atlassian-border shadow-sm">
                <div className="text-xs font-semibold text-atlassian-textSub uppercase">Tổng số công việc</div>
                <div className="text-3xl font-bold mt-1 text-atlassian-text">{tasks.length}</div>
                <div className="text-xs text-emerald-600 mt-2 flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Gồm {tasks.filter(t => t.status === 'Done').length} task hoàn thành
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg border border-atlassian-border shadow-sm">
                <div className="text-xs font-semibold text-atlassian-textSub uppercase">Nhân sự trong dự án</div>
                <div className="text-3xl font-bold mt-1 text-atlassian-text">{members.length}</div>
                <div className="text-xs text-atlassian-textSub mt-2">
                  Quỹ thời gian: {members.reduce((acc, curr) => acc + curr.availableHours, 0)} giờ rảnh
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg border border-atlassian-border shadow-sm">
                <div className="text-xs font-semibold text-atlassian-textSub uppercase">Đã phân công</div>
                <div className="text-3xl font-bold mt-1 text-atlassian-text">
                  {tasks.filter(t => t.assigneeId !== null).length} / {tasks.length}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  Tỷ lệ gán: {Math.round((tasks.filter(t => t.assigneeId !== null).length / (tasks.length || 1)) * 100)}%
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg border border-atlassian-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-atlassian-textSub uppercase">Trạng thái thuật toán</div>
                  <div className="text-lg font-bold mt-1 text-emerald-700 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-emerald-500" /> Sẵn sàng chạy
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('assignment')}
                  className="w-full mt-2 bg-atlassian-blue text-white text-xs font-bold py-2 rounded hover:bg-atlassian-blueHover transition duration-150 flex items-center justify-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Phân công Tự động</span>
                </button>
              </div>
            </div>

            {/* CẤU HÌNH GLOBAL SKILL TAGS POOL */}
            <div className="bg-white p-6 rounded-lg border border-atlassian-border shadow-sm">
              <div className="flex items-center justify-between border-b border-atlassian-border pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-atlassian-text">Cấu hình Danh mục Kỹ năng (Global Skill Tags Pool)</h2>
                  <p className="text-xs text-atlassian-textSub mt-0.5">
                    Định nghĩa danh mục kỹ năng dùng chung một lần cho toàn bộ dự án để nhất quán dữ liệu đầu vào.
                  </p>
                </div>
                <span className="text-xs font-semibold bg-gray-100 text-atlassian-text px-2.5 py-1 rounded-full border">
                  {skillPool.length} Kỹ năng
                </span>
              </div>

              {/* Form Thêm tag mới */}
              <form onSubmit={handleAddGlobalSkill} className="flex space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Nhập tên kỹ năng mới (ví dụ: ReactJS, Python, AWS, ...)"
                  value={newSkillTag}
                  onChange={(e) => setNewSkillTag(e.target.value)}
                  className="flex-1 bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                />
                <button 
                  type="submit"
                  className="bg-atlassian-blue hover:bg-atlassian-blueHover text-white text-sm font-semibold px-4 py-2 rounded flex items-center space-x-1 transition duration-150"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Kỹ Năng</span>
                </button>
              </form>

              {/* Hiển thị danh sách tag hiện có */}
              <div className="flex flex-wrap gap-2">
                {skillPool.map(skill => (
                  <span 
                    key={skill}
                    className="inline-flex items-center bg-blue-50 text-atlassian-blue text-sm font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-100"
                  >
                    <span>{skill}</span>
                    <button 
                      onClick={() => handleRemoveGlobalSkill(skill)}
                      type="button"
                      className="ml-2 p-0.5 hover:bg-blue-100 text-blue-600 rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* PHÂN PHỐI TẢI (WORKLOAD ANALYTICS CHART) */}
            <div className="bg-white p-6 rounded-lg border border-atlassian-border shadow-sm">
              <h2 className="text-lg font-bold text-atlassian-text border-b border-atlassian-border pb-4 mb-4">
                Thống kê Khối lượng Công việc Thực tế của Toàn đội (Workload Distribution)
              </h2>
              
              <div className="space-y-4">
                {members.map(member => {
                  const assigned = workloads[member.id] || 0;
                  const limit = member.availableHours;
                  const percent = Math.round((assigned / limit) * 100);
                  const isOverloaded = assigned > limit;
                  
                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                            {member.name.split(' ').pop().charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-atlassian-text">{member.name}</span>
                            <span className="text-xs text-atlassian-textSub ml-2">({member.email})</span>
                          </div>
                        </div>
                        <div className="text-xs font-semibold">
                          <span className={isOverloaded ? 'text-status-overdueText font-bold' : 'text-atlassian-text'}>
                            {assigned} giờ
                          </span>
                          <span className="text-atlassian-textSub"> / {limit} giờ khả dụng</span>
                          <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] ${
                            isOverloaded 
                              ? 'bg-status-overdueBg text-status-overdueText font-bold' 
                              : 'bg-emerald-50 text-emerald-800'
                          }`}>
                            {percent}% tải
                          </span>
                        </div>
                      </div>

                      {/* Thanh biểu đồ tải CSS chuẩn */}
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isOverloaded ? 'bg-status-overdueText' : 'bg-atlassian-blue'
                          }`}
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}


        {/* TABS 2: NHẬP DANH SÁCH TASK */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-atlassian-text">Quản lý Công việc (Tasks Pool)</h2>
                <p className="text-xs text-atlassian-textSub">Tạo lập, gán kỹ năng cần thiết và dự đoán thời lượng hoàn thành.</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleImportMockTasks}
                  className="bg-white border border-atlassian-border text-atlassian-text text-sm font-semibold px-3 py-2 rounded hover:bg-gray-50 flex items-center space-x-1"
                >
                  <span>Import CSV Mẫu</span>
                </button>
                <button 
                  onClick={handleOpenAddTask}
                  className="bg-atlassian-blue hover:bg-atlassian-blueHover text-white text-sm font-semibold px-4 py-2 rounded flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo Task Mới</span>
                </button>
              </div>
            </div>

            {/* THANH TÌM KIẾM VÀ LỌC TAGS */}
            <div className="bg-white p-4 rounded-lg border border-atlassian-border flex flex-wrap gap-3 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-atlassian-textSub absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Tìm kiếm công việc theo tên..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="w-full bg-white border border-atlassian-border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-atlassian-textSub">Lọc theo kỹ năng:</span>
                <select
                  value={taskFilterTag}
                  onChange={(e) => setTaskFilterTag(e.target.value)}
                  className="bg-white border border-atlassian-border rounded text-sm p-1.5 focus:outline-none"
                >
                  <option value="Tất cả">Tất cả kỹ năng</option>
                  {skillPool.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* BẢNG DANH SÁCH TASK */}
            <div className="bg-white rounded-lg border border-atlassian-border shadow-sm overflow-x-auto">
              {filteredTasks.length === 0 ? (
                <div className="p-12 text-center text-atlassian-textSub">
                  <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="font-semibold text-sm">Không tìm thấy công việc nào khớp với bộ lọc!</p>
                  <p className="text-xs mt-1">Vui lòng thử tìm kiếm khác hoặc bấm Thêm công việc mới.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-atlassian-border text-xs font-bold text-atlassian-textSub uppercase tracking-wider">
                      <th className="p-4 w-12">STT</th>
                      <th className="p-4">Tên công việc (Task Name)</th>
                      <th className="p-4 w-28">Thời lượng</th>
                      <th className="p-4">Kỹ năng yêu cầu</th>
                      <th className="p-4 w-28">Độ ưu tiên</th>
                      <th className="p-4 w-28">Trạng thái</th>
                      <th className="p-4 w-28">Người làm</th>
                      <th className="p-4 w-24 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-atlassian-border text-sm">
                    {filteredTasks.map((task, index) => {
                      const assignee = members.find(m => m.id === task.assigneeId);
                      return (
                        <tr key={task.id} className="hover:bg-gray-50/50 transition">
                          <td className="p-4 text-atlassian-textSub">{index + 1}</td>
                          <td className="p-4 font-semibold text-atlassian-text">{task.name}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center space-x-1 font-medium bg-slate-100 text-slate-800 px-2 py-1 rounded">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{task.hours} giờ</span>
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {task.tags.map(tag => (
                                <span key={tag} className="bg-blue-50 text-atlassian-blue text-xs font-semibold px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                              {task.tags.length === 0 && <span className="text-xs italic text-atlassian-textSub">Không yêu cầu</span>}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              task.priority === 'Cao' ? 'bg-red-50 text-red-700' :
                              task.priority === 'Trung bình' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                              task.status === 'Done' ? 'bg-status-doneBg text-status-doneText' :
                              task.status === 'Doing' ? 'bg-status-doingBg text-status-doingText' : 'bg-status-todoBg text-status-todoText'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {assignee ? (
                              <div className="flex items-center space-x-1.5">
                                <span className="w-5 h-5 rounded-full bg-slate-200 text-[10px] font-bold flex items-center justify-center">
                                  {assignee.name.split(' ').pop().charAt(0)}
                                </span>
                                <span className="font-medium text-xs max-w-[100px] truncate">{assignee.name}</span>
                              </div>
                            ) : (
                              <span className="text-xs italic text-atlassian-textSub">Chưa gán</span>
                            )}
                          </td>
                          <td className="p-4 text-right space-x-1 shrink-0">
                            <button 
                              onClick={() => handleOpenEditTask(task)}
                              className="p-1.5 hover:bg-slate-100 text-atlassian-blue hover:text-atlassian-blueHover rounded"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1.5 hover:bg-slate-100 text-status-overdueText rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}


        {/* TABS 3: QUẢN LÝ THÀNH VIÊN */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-atlassian-text">Danh sách Nhân sự & Năng lực (Team Roster)</h2>
                <p className="text-xs text-atlassian-textSub">Khai báo năng lực chuyên môn và quỹ thời gian rảnh khả dụng theo tuần.</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleImportMockMembers}
                  className="bg-white border border-atlassian-border text-atlassian-text text-sm font-semibold px-3 py-2 rounded hover:bg-gray-50 flex items-center space-x-1"
                >
                  <span>Import CSV Mẫu</span>
                </button>
                <button 
                  onClick={handleOpenAddMember}
                  className="bg-atlassian-blue hover:bg-atlassian-blueHover text-white text-sm font-semibold px-4 py-2 rounded flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Thành Viên</span>
                </button>
              </div>
            </div>

            {/* THANH TÌM KIẾM THÀNH VIÊN */}
            <div className="bg-white p-4 rounded-lg border border-atlassian-border">
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-atlassian-textSub absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Tìm kiếm thành viên theo Tên hoặc Email..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full bg-white border border-atlassian-border pl-10 pr-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                />
              </div>
            </div>

            {/* GRID DANH SÁCH THÀNH VIÊN */}
            {filteredMembers.length === 0 ? (
              <div className="bg-white p-12 rounded-lg border border-atlassian-border text-center text-atlassian-textSub">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="font-semibold text-sm">Không tìm thấy thành viên nào khớp với bộ lọc!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMembers.map(member => {
                  const currentHoursAssigned = workloads[member.id] || 0;
                  const warningOverload = currentHoursAssigned > member.availableHours;
                  
                  return (
                    <div key={member.id} className="bg-white p-5 rounded-lg border border-atlassian-border shadow-sm flex flex-col justify-between hover:shadow-md transition">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-atlassian-blue/10 text-atlassian-blue font-bold flex items-center justify-center text-sm">
                              {member.name.split(' ').pop().charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-atlassian-text text-base">{member.name}</h3>
                              <p className="text-xs text-atlassian-textSub">{member.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1 shrink-0">
                            <button 
                              onClick={() => handleOpenEditMember(member)}
                              className="p-1 hover:bg-slate-100 text-atlassian-blue rounded"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteMember(member.id)}
                              className="p-1 hover:bg-slate-100 text-status-overdueText rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* GIỜ KHẢ DỤNG & GIỜ ĐÃ GÁN */}
                        <div className="flex items-center justify-between text-xs border-y py-2 border-slate-100">
                          <div>
                            <span className="text-atlassian-textSub">Giờ rảnh:</span>{' '}
                            <strong className="text-atlassian-text">{member.availableHours}h/tuần</strong>
                          </div>
                          <div>
                            <span className="text-atlassian-textSub">Đã giao:</span>{' '}
                            <strong className={warningOverload ? 'text-status-overdueText font-bold' : 'text-atlassian-text'}>
                              {currentHoursAssigned}h
                            </strong>
                          </div>
                        </div>

                        {/* Kỹ năng sở trường */}
                        <div>
                          <span className="text-xs font-semibold text-atlassian-textSub block mb-1.5">Kỹ năng sở trường:</span>
                          <div className="flex flex-wrap gap-1">
                            {member.tags.map(tag => (
                              <span key={tag} className="bg-blue-50 text-atlassian-blue text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100/50">
                                {tag}
                              </span>
                            ))}
                            {member.tags.length === 0 && (
                              <span className="text-xs italic text-status-overdueText bg-red-50 px-2 py-0.5 rounded">
                                Chưa gán kỹ năng sở trường
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}


        {/* TABS 4: AUTO-ASSIGNMENT WORKSPACE */}
        {activeTab === 'assignment' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-atlassian-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-atlassian-text flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-atlassian-blue animate-spin" />
                  Không gian Tự động Phân công Tối ưu (Smart Matching Workspace)
                </h2>
                <p className="text-xs text-atlassian-textSub max-w-2xl">
                  Chạy thuật toán Weighted Scoring và đối sánh Greedy. Hệ thống khớp Kỹ năng (trọng số 70%) và Thời lượng khả dụng (trọng số 30%), giúp cân bằng tải công việc tự động.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={handleTriggerAutoAssignment}
                  disabled={isMappingLoading}
                  className="w-full md:w-auto bg-atlassian-blue hover:bg-atlassian-blueHover disabled:bg-blue-300 text-white font-bold px-6 py-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 transition duration-150"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isMappingLoading ? "Đang xử lý thuật toán..." : "Chạy Tự động Phân công"}</span>
                </button>
              </div>
            </div>

            {/* LOADING OVERLAY GIẢ LẬP MƯỢT MÀ */}
            {isMappingLoading ? (
              <div className="bg-white p-12 rounded-lg border border-atlassian-border text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full" />
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-atlassian-blue border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <p className="font-bold text-atlassian-text">Đang phân tích và đối sánh tối ưu...</p>
                  <p className="text-xs text-atlassian-blue font-semibold">
                    {loadingStep === 0 && "Quét danh mục kĩ năng pool..."}
                    {loadingStep === 1 && "Tính toán thời gian khả dụng còn lại..."}
                    {loadingStep === 2 && "Chạy thuật toán Weighted Scoring (Skill 0.7 vs Availability 0.3)..."}
                    {loadingStep === 3 && "Phân phối công việc và xử lý xung đột bottleneck..."}
                    {loadingStep === 4 && "Đang hoàn tất lưu phương án!"}
                  </p>
                  
                  {/* Progress bar giả lập */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3 border">
                    <div 
                      className="bg-atlassian-blue h-full rounded-full transition-all duration-300"
                      style={{ width: `${(loadingStep + 1) * 20}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* HIỂN THỊ KẾT QUẢ GỢI Ý MAPPING */}
                {assignmentResults.length === 0 ? (
                  <div className="bg-white p-12 rounded-lg border border-atlassian-border text-center text-atlassian-textSub">
                    <Sparkles className="w-16 h-16 mx-auto text-atlassian-blue/20 mb-3" />
                    <p className="font-bold text-base text-atlassian-text">Chưa chạy phân công tự động hoặc chưa có phương án đề xuất</p>
                    <p className="text-xs mt-1">Bấm nút "Chạy Tự động Phân công" ở trên để thuật toán phân bổ nhân sự tối ưu.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg border border-atlassian-border shadow-sm overflow-hidden">
                      <div className="bg-slate-50 border-b border-atlassian-border p-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-sm font-bold text-atlassian-text">BẢNG XEM TRƯỚC ĐỀ XUẤT PHÂN CÔNG (PREVIEW ASSIGNMENT MATRIX)</div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setIsResendModalOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded shadow-sm flex items-center space-x-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Gửi email Thông báo Toàn đội</span>
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50/50 border-b border-atlassian-border text-xs font-bold text-atlassian-textSub uppercase tracking-wider">
                              <th className="p-4">Tên công việc (Task Name)</th>
                              <th className="p-4 w-28">Thời lượng</th>
                              <th className="p-4 w-72">Nhân sự được đề xuất (Manual Override)</th>
                              <th className="p-4 w-32 text-center">Độ khớp đề xuất</th>
                              <th className="p-4"> breakdowns điểm số</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-atlassian-border text-sm">
                            {assignmentResults.map(res => {
                              const taskObj = tasks.find(t => t.id === res.taskId);
                              const matchScore = res.scores.totalScore;
                              
                              return (
                                <tr key={res.taskId} className="hover:bg-gray-50/50">
                                  <td className="p-4 font-semibold text-atlassian-text">{res.taskName}</td>
                                  <td className="p-4">
                                    <span className="font-semibold">{res.taskHours}h</span>
                                  </td>
                                  <td className="p-4">
                                    {/* Dropdown chỉnh sửa thủ công (Manual Override) */}
                                    <select
                                      value={res.memberId || ''}
                                      onChange={(e) => handleManualOverride(res.taskId, e.target.value)}
                                      className="w-full bg-white border border-atlassian-border rounded p-1.5 text-xs font-medium focus:ring-1 focus:ring-atlassian-blue"
                                    >
                                      <option value="">-- Chưa phân công --</option>
                                      {members.map(m => (
                                        <option key={m.id} value={m.id}>{m.name} ({m.availableHours}h rảnh)</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="p-4 text-center">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                                      matchScore >= 80 ? 'bg-emerald-100 text-score-high' :
                                      matchScore >= 50 ? 'bg-amber-100 text-score-med' : 'bg-red-100 text-score-low'
                                    }`}>
                                      {matchScore}% khớp
                                    </span>
                                  </td>
                                  <td className="p-4 text-xs text-atlassian-textSub flex items-center justify-between">
                                    <div className="flex space-x-3">
                                      <span>Kỹ năng: <strong>{res.scores.skillScore}%</strong></span>
                                      <span>Giờ rảnh: <strong>{res.scores.availabilityScore}%</strong></span>
                                    </div>
                                    <ScoreTooltip scores={res.scores} />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}


        {/* TABS 5: BẢNG KANBAN TIẾN ĐỘ */}
        {activeTab === 'kanban' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-atlassian-text">Bảng Tiến độ Kanban (Sprint Board)</h2>
                <p className="text-xs text-atlassian-textSub">Trực quan hóa tiến trình công việc của toàn dự án dưới dạng Atlassian board.</p>
              </div>
            </div>

            {/* KANBAN BOARD 3 CỘT CHUẨN MÀU */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* CỘT TO DO */}
              <div className="bg-gray-100 p-4 rounded-lg border border-atlassian-border flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                  <span className="font-bold text-sm text-slate-700 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 mr-2" />
                    CHƯA BẮT ĐẦU (TO DO)
                  </span>
                  <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.status === 'To Do').length}
                  </span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {tasks.filter(t => t.status === 'To Do').map(task => {
                    const assignee = members.find(m => m.id === task.assigneeId);
                    return (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTaskDetail(task)}
                        className="bg-white p-4 rounded border border-atlassian-border shadow-sm hover:border-atlassian-blue cursor-pointer space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <span className="bg-red-50 text-red-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                            {task.priority}
                          </span>
                          <span className="text-xs text-atlassian-textSub flex items-center">
                            <Clock className="w-3 h-3 mr-0.5" /> {task.hours}h
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-atlassian-text">{task.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map(tag => (
                            <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-atlassian-textSub">
                          <span className="text-[10px]">Đổi cột:</span>
                          <select 
                            value={task.status} 
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setTasks(tasks.map(t => t.id === task.id ? { ...t, status: e.target.value } : t));
                              triggerToast(`Đã chuyển "${task.name}" sang cột ${e.target.value}!`, "info");
                            }}
                            className="bg-slate-50 border border-slate-200 rounded text-[10px] p-0.5 focus:outline-none"
                          >
                            <option value="To Do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CỘT DOING */}
              <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100 flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                  <span className="font-bold text-sm text-amber-800 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2" />
                    ĐANG THỰC HIỆN (DOING)
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.status === 'Doing').length}
                  </span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {tasks.filter(t => t.status === 'Doing').map(task => {
                    const assignee = members.find(m => m.id === task.assigneeId);
                    return (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTaskDetail(task)}
                        className="bg-white p-4 rounded border border-atlassian-border shadow-sm hover:border-atlassian-blue cursor-pointer space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <span className="bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                            {task.priority}
                          </span>
                          <span className="text-xs text-atlassian-textSub flex items-center">
                            <Clock className="w-3 h-3 mr-0.5" /> {task.hours}h
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-atlassian-text">{task.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map(tag => (
                            <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-atlassian-textSub">
                          <span className="text-[10px]">Đổi cột:</span>
                          <select 
                            value={task.status} 
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setTasks(tasks.map(t => t.id === task.id ? { ...t, status: e.target.value } : t));
                              triggerToast(`Đã chuyển "${task.name}" sang cột ${e.target.value}!`, "info");
                            }}
                            className="bg-slate-50 border border-slate-200 rounded text-[10px] p-0.5 focus:outline-none"
                          >
                            <option value="To Do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CỘT DONE */}
              <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100 flex flex-col h-[600px]">
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                  <span className="font-bold text-sm text-emerald-800 flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2" />
                    HOÀN THÀNH (DONE)
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.status === 'Done').length}
                  </span>
                </div>
                
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {tasks.filter(t => t.status === 'Done').map(task => {
                    const assignee = members.find(m => m.id === task.assigneeId);
                    return (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTaskDetail(task)}
                        className="bg-white p-4 rounded border border-atlassian-border shadow-sm hover:border-atlassian-blue cursor-pointer space-y-3 opacity-90"
                      >
                        <div className="flex justify-between items-start">
                          <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                            {task.priority}
                          </span>
                          <span className="text-xs text-atlassian-textSub flex items-center">
                            <Clock className="w-3 h-3 mr-0.5" /> {task.hours}h
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-atlassian-text line-through text-slate-400">{task.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map(tag => (
                            <span key={tag} className="bg-slate-100 text-slate-400 text-[10px] px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-atlassian-textSub">
                          <span className="text-[10px]">Đổi cột:</span>
                          <select 
                            value={task.status} 
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setTasks(tasks.map(t => t.id === task.id ? { ...t, status: e.target.value } : t));
                              triggerToast(`Đã chuyển "${task.name}" sang cột ${e.target.value}!`, "info");
                            }}
                            className="bg-slate-50 border border-slate-200 rounded text-[10px] p-0.5 focus:outline-none"
                          >
                            <option value="To Do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER BAR */}
      <footer className="bg-white border-t border-atlassian-border py-4 px-6 text-center text-xs text-atlassian-textSub">
        © 2026 TaskAssign AI - Thiết kế nghiên cứu và xây dựng nguyên mẫu cho đồ án Tương tác Người - Máy (CSC12106)
      </footer>

      {/* --- CÁC MODAL DIALOG POPUP --- */}

      {/* 1. MODAL THÊM / SỬA TASK */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-atlassian-border overflow-hidden">
            <div className="bg-slate-50 border-b border-atlassian-border px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-atlassian-text">
                {editingTask ? "Cập nhật Công việc" : "Thêm Công việc Mới"}
              </h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-atlassian-textSub hover:text-atlassian-text">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveTask} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-atlassian-text">Tên công việc (Task Name) <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thiết kế Dashboard, Viết Backend API..."
                  value={taskForm.name}
                  onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                  className="w-full bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-atlassian-text">Thời lượng ước tính (Giờ) <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={taskForm.hours}
                    onChange={(e) => setTaskForm({ ...taskForm, hours: Number(e.target.value) })}
                    className="w-full bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-atlassian-text">Độ ưu tiên</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none"
                  >
                    <option value="Cao">Cao</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Thấp">Thấp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-atlassian-text block mb-1">Kỹ năng yêu cầu (Chọn từ Pool chung)</label>
                <div className="flex flex-wrap gap-1.5 p-3 border border-atlassian-border rounded bg-slate-50 max-h-36 overflow-y-auto">
                  {skillPool.map(skill => {
                    const isSelected = taskForm.tags.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleToggleTaskTag(skill)}
                        className={`text-xs px-2.5 py-1 rounded transition ${
                          isSelected 
                            ? 'bg-atlassian-blue text-white font-semibold' 
                            : 'bg-white border text-atlassian-text hover:bg-gray-100'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsTaskModalOpen(false)}
                  className="border border-atlassian-border text-atlassian-text text-sm font-semibold px-4 py-2 rounded hover:bg-gray-50"
                >
                  Hủy Bỏ
                </button>
                <button 
                  type="submit"
                  className="bg-atlassian-blue hover:bg-atlassian-blueHover text-white text-sm font-semibold px-4 py-2 rounded shadow"
                >
                  Lưu Lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL THÊM / SỬA THÀNH VIÊN */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-atlassian-border overflow-hidden">
            <div className="bg-slate-50 border-b border-atlassian-border px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-atlassian-text">
                {editingMember ? "Cập nhật Thành viên" : "Thêm Thành viên Mới"}
              </h3>
              <button onClick={() => setIsMemberModalOpen(false)} className="text-atlassian-textSub hover:text-atlassian-text">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMember} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-atlassian-text">Họ & Tên <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  className="w-full bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-atlassian-text">Email nhận thông báo <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    className="w-full bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-atlassian-text">Số giờ rảnh / tuần <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={168}
                    value={memberForm.availableHours}
                    onChange={(e) => setMemberForm({ ...memberForm, availableHours: Number(e.target.value) })}
                    className="w-full bg-white border border-atlassian-border px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-atlassian-blue"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-atlassian-text block mb-1">Kỹ năng sở trường (Chọn từ Pool chung)</label>
                <div className="flex flex-wrap gap-1.5 p-3 border border-atlassian-border rounded bg-slate-50 max-h-36 overflow-y-auto">
                  {skillPool.map(skill => {
                    const isSelected = memberForm.tags.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => handleToggleMemberTag(skill)}
                        className={`text-xs px-2.5 py-1 rounded transition ${
                          isSelected 
                            ? 'bg-atlassian-blue text-white font-semibold' 
                            : 'bg-white border text-atlassian-text hover:bg-gray-100'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsMemberModalOpen(false)}
                  className="border border-atlassian-border text-atlassian-text text-sm font-semibold px-4 py-2 rounded hover:bg-gray-50"
                >
                  Hủy Bỏ
                </button>
                <button 
                  type="submit"
                  className="bg-atlassian-blue hover:bg-atlassian-blueHover text-white text-sm font-semibold px-4 py-2 rounded shadow"
                >
                  Lưu Lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL CONFIRM RESEND GỬI EMAIL THÔNG BÁO HÀNG LOẠT */}
      {isResendModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full border border-atlassian-border overflow-hidden">
            <div className="bg-slate-50 border-b border-atlassian-border px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-atlassian-text flex items-center">
                <Mail className="w-5 h-5 mr-2 text-atlassian-blue" />
                Xác nhận Gửi Thông báo Phân công Hàng loạt
              </h3>
              <button onClick={() => setIsResendModalOpen(false)} className="text-atlassian-textSub hover:text-atlassian-text">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-atlassian-text">
                Hệ thống chuẩn bị gửi danh sách công việc đã gán qua cổng **Resend API** đến các địa chỉ email nhân sự thực tế:
              </p>

              <div className="bg-slate-50 border p-4 rounded text-xs space-y-3 font-mono">
                {members.map(member => {
                  const memberTasks = tasks.filter(t => t.assigneeId === member.id);
                  return (
                    <div key={member.id} className="border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
                      <span className="text-atlassian-blue font-bold">To: {member.email}</span>
                      <p className="mt-1 text-slate-600 font-sans">
                        Xin chào <strong>{member.name}</strong>, bạn được phân bổ các task sau cho tuần này:
                        <ul className="list-disc pl-4 mt-1 space-y-0.5">
                          {memberTasks.map(t => (
                            <li key={t.id}>{t.name} ({t.hours} giờ)</li>
                          ))}
                          {memberTasks.length === 0 && <li className="italic text-slate-400">Không có công việc được phân gán.</li>}
                        </ul>
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded flex items-start space-x-2 text-amber-950 text-xs">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Lưu ý quan trọng:</strong> Hành động này sẽ kích hoạt dịch vụ giả lập cổng gửi email thật qua Resend API kết nối Supabase Edge Function theo Phase 1.
                </span>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsResendModalOpen(false)}
                  className="border border-atlassian-border text-atlassian-text text-sm font-semibold px-4 py-2 rounded hover:bg-gray-50"
                >
                  Hủy Bỏ
                </button>
                <button 
                  type="button"
                  onClick={handleConfirmSendEmails}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded shadow"
                >
                  Xác nhận Gửi Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL CHI TIẾT TASK (TASK DETAIL DRAWER / POPUP) */}
      {selectedTaskDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-atlassian-border overflow-hidden">
            <div className="bg-slate-50 border-b border-atlassian-border px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-atlassian-text flex items-center">
                <Trello className="w-5 h-5 mr-2 text-atlassian-blue" />
                Chi tiết Công việc (Task Detail Panel)
              </h3>
              <button onClick={() => setSelectedTaskDetail(null)} className="text-atlassian-textSub hover:text-atlassian-text">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-atlassian-textSub uppercase">Tên công việc</span>
                <p className="text-lg font-bold text-atlassian-text">{selectedTaskDetail.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-atlassian-textSub uppercase block">Thời lượng</span>
                  <span className="inline-flex items-center space-x-1 font-semibold text-sm bg-slate-100 text-slate-800 px-2.5 py-1 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedTaskDetail.hours} giờ</span>
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-atlassian-textSub uppercase block">Độ ưu tiên</span>
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold ${
                    selectedTaskDetail.priority === 'Cao' ? 'bg-red-50 text-red-700' :
                    selectedTaskDetail.priority === 'Trung bình' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {selectedTaskDetail.priority}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-atlassian-textSub uppercase block">Trạng thái Sprint</span>
                <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase ${
                  selectedTaskDetail.status === 'Done' ? 'bg-status-doneBg text-status-doneText' :
                  selectedTaskDetail.status === 'Doing' ? 'bg-status-doingBg text-status-doingText' : 'bg-status-todoBg text-status-todoText'
                }`}>
                  {selectedTaskDetail.status}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-atlassian-textSub uppercase block">Kỹ năng yêu cầu</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTaskDetail.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-atlassian-blue text-xs font-semibold px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {selectedTaskDetail.tags.length === 0 && <span className="text-xs italic text-slate-400">Không có</span>}
                </div>
              </div>

              <div className="space-y-2 border-t pt-4 mt-2">
                <span className="text-[10px] font-bold text-atlassian-textSub uppercase block">Người phụ trách được gán</span>
                <div className="bg-slate-50 p-3 rounded border flex items-center justify-between">
                  {selectedTaskDetail.assigneeId ? {
                    assignee: members.find(m => m.id === selectedTaskDetail.assigneeId),
                    render() {
                      return this.assignee ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-atlassian-blue text-white font-bold flex items-center justify-center text-xs">
                            {this.assignee.name.split(' ').pop().charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-atlassian-text">{this.assignee.name}</p>
                            <p className="text-xs text-atlassian-textSub">{this.assignee.email}</p>
                          </div>
                        </div>
                      ) : <span className="text-sm italic text-slate-400">Không tìm thấy thành viên</span>;
                    }
                  }.render() : (
                    <span className="text-sm italic text-slate-400">Chưa được phân công</span>
                  )}

                  {/* Cho phép điều chỉnh trực tiếp */}
                  <select
                    value={selectedTaskDetail.assigneeId || ''}
                    onChange={(e) => {
                      handleManualOverride(selectedTaskDetail.id, e.target.value);
                      setSelectedTaskDetail({ ...selectedTaskDetail, assigneeId: e.target.value === '' ? null : Number(e.target.value) });
                    }}
                    className="bg-white border border-atlassian-border rounded p-1 text-xs font-medium focus:outline-none"
                  >
                    <option value="">-- Hủy gán --</option>
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button 
                  onClick={() => setSelectedTaskDetail(null)}
                  className="bg-atlassian-blue hover:bg-atlassian-blueHover text-white text-sm font-semibold px-4 py-2 rounded"
                >
                  Đóng Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
