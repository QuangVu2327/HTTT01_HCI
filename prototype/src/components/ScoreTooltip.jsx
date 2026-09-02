import React, { useState } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function ScoreTooltip({ scores }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center space-x-1 text-xs text-[#0052CC] hover:text-[#0065FF] font-medium transition cursor-pointer"
        title="Bấm để xem chi tiết cách tính điểm AI Match"
      >
        <Sparkles className="w-3 h-3 text-[#0052CC]" />
        <span>Giải thích Match Score</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-50 w-72 bg-[#172B4D] text-white text-xs rounded-lg shadow-xl p-3.5 space-y-2.5 border border-slate-700 animate-fadeIn">
          <div className="font-bold text-[#57D9A3] border-b border-slate-700 pb-1.5 flex items-center justify-between">
            <span>Thuật toán Weighted Scoring</span>
            <span className="text-[10px] bg-blue-900/50 text-blue-200 px-1.5 py-0.5 rounded">AI Match</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Tổng điểm (Total):</span>
              <strong className="text-white font-bold">{scores.totalScore}%</strong>
            </div>
            <div className="text-[10px] text-slate-400 italic">
              Công thức: 0.7 × Skill + 0.3 × Availability
            </div>
          </div>
          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Điểm kỹ năng (70%):</span>
              <span className="font-bold text-[#E3FCEF] bg-emerald-900/40 px-1.5 py-0.5 rounded">
                {scores.skillScore}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Điểm thời gian rảnh (30%):</span>
              <span className="font-bold text-[#FFF0B3] bg-amber-900/40 px-1.5 py-0.5 rounded">
                {scores.availabilityScore}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
