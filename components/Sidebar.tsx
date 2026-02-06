import React from 'react';
import { Home, BookOpen, Trophy, Settings, Sword, User } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, icon: Home, label: 'แผนที่โลก' },
    { id: ViewState.LESSON, icon: BookOpen, label: 'คัมภีร์ความรู้' },
    { id: ViewState.CODE_ARENA, icon: Sword, label: 'ลานประลองโค้ด' },
    { id: ViewState.QUIZ, icon: Trophy, label: 'ทดสอบฝีมือ' },
  ];

  return (
    <div className="w-64 h-screen bg-roblox-panel border-r border-gray-700 flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
          <span className="text-xl font-bold text-white">R</span>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Roblox<br/>Academy</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-roblox-dark text-white shadow-inner border border-gray-700/50'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
          >
            <item.icon
              size={20}
              className={`${
                currentView === item.id ? 'text-roblox-accent' : 'text-gray-500 group-hover:text-white'
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
             <User size={24} className="text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Novice Coder</p>
            <p className="text-xs text-roblox-success">Online</p>
          </div>
          <Settings size={18} className="text-gray-500 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};