import React from 'react';
import { Heart, Flame, Gem, Home, Settings, Trophy, Map, User } from 'lucide-react';
import { UserStats, ViewState } from '../types';

interface TopBarProps {
  stats: UserStats;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ stats, currentView, onNavigate }) => {
  return (
    <div className="h-16 md:h-20 bg-roblox-panel border-b border-gray-800 flex items-center justify-between px-4 md:px-8 shadow-lg z-20 sticky top-0">
      
      {/* Left: Branding */}
      <div className="flex items-center gap-6 w-1/4">
        <button 
            onClick={() => onNavigate(ViewState.DASHBOARD)}
            className="flex items-center gap-3 group"
        >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl font-bold text-white">R</span>
            </div>
            <div className="hidden lg:block">
                <h1 className="font-bold text-lg leading-none text-white group-hover:text-roblox-accent transition-colors">Roblox<br/>Academy</h1>
            </div>
        </button>
      </div>

      {/* Center: Navigation Tabs */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
            onClick={() => onNavigate(ViewState.DASHBOARD)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl border-b-4 transition-all ${
                currentView === ViewState.DASHBOARD 
                ? 'bg-gray-800 border-roblox-blue text-blue-400' 
                : 'border-transparent hover:bg-gray-800 text-gray-400'
            }`}
        >
            <Map size={20} />
            <span className="font-bold hidden md:block">LEARN</span>
        </button>

        <button
            onClick={() => onNavigate(ViewState.LEADERBOARD)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl border-b-4 transition-all ${
                currentView === ViewState.LEADERBOARD 
                ? 'bg-gray-800 border-roblox-gold text-yellow-400' 
                : 'border-transparent hover:bg-gray-800 text-gray-400'
            }`}
        >
            <Trophy size={20} />
            <span className="font-bold hidden md:block">RANKING</span>
        </button>
      </div>

      {/* Right: Currency & Profile */}
      <div className="flex items-center justify-end gap-3 md:gap-6 w-1/4">
        {/* Gems */}
        <div className="hidden lg:flex items-center gap-2">
            <Gem className="text-blue-400 fill-blue-400/20" size={20} />
            <span className="font-bold text-lg text-blue-400">{stats.gems}</span>
        </div>

        {/* Streak */}
        <div className="hidden lg:flex items-center gap-2">
            <Flame className="text-orange-500 fill-orange-500/20" size={20} />
            <span className="font-bold text-lg text-orange-500">{stats.streak}</span>
        </div>

        {/* Hearts */}
        <div className="hidden md:flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-xl border border-gray-700">
            <Heart className="text-roblox-accent fill-roblox-accent" size={20} />
            <span className="font-bold text-lg text-white">{stats.hearts}</span>
        </div>
        
        {/* Profile Avatar */}
        <button 
            onClick={() => onNavigate(ViewState.PROFILE)}
            className={`w-10 h-10 rounded-full bg-gray-700 border-2 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform ${
                currentView === ViewState.PROFILE ? 'border-white' : 'border-transparent hover:border-gray-500'
            }`}
        >
            <User size={24} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
};