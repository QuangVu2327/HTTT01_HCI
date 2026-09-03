import React from 'react';
import { Briefcase, Users, Sparkles, Trello, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: Briefcase },
    { id: 'tasks', label: 'Tasks', icon: Plus },
    { id: 'members', label: 'Nhân sự', icon: Users },
    { id: 'assignment', label: 'Phân công AI', icon: Sparkles },
    { id: 'kanban', label: 'Kanban', icon: Trello },
  ];

  return (
    <div className={`bg-white border-r border-atlassian-border transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
      <div className="p-5 flex items-center justify-between">
        {isOpen && <span className="font-bold text-lg text-atlassian-blue">TaskAssign AI</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded hover:bg-gray-100">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 px-3 space-y-2 mt-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base font-medium transition ${
                isActive 
                  ? 'bg-blue-50 text-atlassian-blue' 
                  : 'text-atlassian-textSub hover:bg-gray-100 hover:text-atlassian-text'
              }`}
            >
              <Icon size={22} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
