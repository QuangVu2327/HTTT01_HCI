/**
 * Tính điểm khớp (Match Score) giữa một Task và một Thành viên
 * w1 = 0.7 (Trọng số kỹ năng)
 * w2 = 0.3 (Trọng số thời gian rảnh)
 */
export function calculateMatchScore(task, member, remainingHoursMap) {
  const taskTags = task.tags || [];
  const memberTags = member.tags || [];
  
  // 1. Tính Skill Score
  let skillScore = 1.0;
  if (taskTags.length > 0) {
    const matchCount = taskTags.filter(tag => memberTags.includes(tag)).length;
    skillScore = matchCount / taskTags.length;
  }
  
  // 2. Tính Availability Score
  const remainingHours = remainingHoursMap[member.id] !== undefined 
    ? remainingHoursMap[member.id] 
    : member.availableHours;
    
  let availabilityScore = 0.0;
  if (remainingHours >= task.hours) {
    availabilityScore = 1.0;
  } else if (remainingHours > 0) {
    availabilityScore = remainingHours / task.hours;
  } else {
    availabilityScore = 0.0;
  }
  
  // 3. Điểm tổng hợp
  const totalScore = (0.7 * skillScore + 0.3 * availabilityScore) * 100;
  
  return {
    skillScore: Math.round(skillScore * 100),
    availabilityScore: Math.round(availabilityScore * 100),
    totalScore: Math.round(totalScore)
  };
}

/**
 * Thuật toán phân công tự động (Greedy Match with Bottleneck & Priority handling)
 */
export function runAutoAssignment(tasks, members) {
  // Lọc chỉ các task cần phân công (To Do)
  const sortedTasks = [...tasks]
    .filter(t => t.status === 'To Do')
    .sort((a, b) => {
    // Sắp xếp theo độ ưu tiên: Cao (3) -> Trung bình (2) -> Thấp (1)
    const priorityWeight = { 'Cao': 3, 'Trung bình': 2, 'Thấp': 1 };
    const pA = priorityWeight[a.priority] || 2;
    const pB = priorityWeight[b.priority] || 2;
    if (pA !== pB) return pB - pA;
    // Nếu cùng độ ưu tiên, sắp xếp theo thời lượng giảm dần
    return b.hours - a.hours;
  });
  
  // Khởi tạo map lưu giờ rảnh còn lại của từng thành viên
  const remainingHoursMap = {};
  members.forEach(m => {
    remainingHoursMap[m.id] = m.availableHours;
  });
  
  const assignments = [];
  
  sortedTasks.forEach(task => {
    let bestMember = null;
    let bestScores = { skillScore: 0, availabilityScore: 0, totalScore: -1 };
    let fitsInTime = false;
    
  // Quét tìm người phù hợp nhất
    members.forEach(member => {
      // BỎ QUA nếu task đã xong hoặc đang làm và đã có người nhận
      if ((task.status === 'Doing' || task.status === 'Done') && task.assigneeId) return;

      const scores = calculateMatchScore(task, member, remainingHoursMap);
      const hasEnoughTime = remainingHoursMap[member.id] >= task.hours;
      
      // Chiến lược ưu tiên người đủ giờ rảnh trước, sau đó xét tới điểm cao nhất
      if (hasEnoughTime && !fitsInTime) {
        // Lần đầu tìm thấy người đủ giờ rảnh, tự động nhận người này trước
        fitsInTime = true;
        bestMember = member;
        bestScores = scores;
      } else if (hasEnoughTime && fitsInTime) {
        // So sánh điểm giữa những người cùng đủ giờ rảnh
        if (scores.totalScore > bestScores.totalScore) {
          bestMember = member;
          bestScores = scores;
        }
      } else if (!hasEnoughTime && !fitsInTime) {
        // Nếu chưa tìm thấy ai đủ giờ rảnh, chọn người có điểm cao nhất (gây quá tải)
        if (scores.totalScore > bestScores.totalScore) {
          bestMember = member;
          bestScores = scores;
        }
      }
    });
    
    if (bestMember) {
      // Tiến hành gán task
      remainingHoursMap[bestMember.id] -= task.hours;
      assignments.push({
        taskId: task.id,
        taskName: task.name,
        taskHours: task.hours,
        memberId: bestMember.id,
        memberName: bestMember.name,
        memberEmail: bestMember.email,
        scores: bestScores
      });
    } else {
      // Trường hợp hiếm gặp khi dự án không có thành viên nào
      assignments.push({
        taskId: task.id,
        taskName: task.name,
        taskHours: task.hours,
        memberId: null,
        memberName: 'Chưa phân công',
        memberEmail: '',
        scores: { skillScore: 0, availabilityScore: 0, totalScore: 0 }
      });
    }
  });
  
  return {
    assignments,
    remainingHoursMap
  };
}
