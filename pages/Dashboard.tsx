import React from 'react';
import { Star, Lock, Play, Check, Shield, Zap, User, Trophy, Dumbbell } from 'lucide-react';
import { ViewState, UserStats } from '../types';

interface DashboardProps {
    stats: UserStats;
    onStartLevel: () => void;
    onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, onStartLevel, onNavigate }) => {
  
  // Mock Data for the Pathway
  const units = [
    {
        id: 1,
        title: "Unit 1: Fundamentals",
        description: "Variables, Strings, and Numbers",
        color: "bg-roblox-accent",
        lessons: [
            { id: 1, icon: Star, status: 'completed', stars: 3 },
            { id: 2, icon: Star, status: 'completed', stars: 2 },
            { id: 3, icon: Star, status: 'current', stars: 0 },
            { id: 4, icon: Star, status: 'locked', stars: 0 },
            { id: 5, icon: Trophy, status: 'locked', stars: 0, isBoss: true },
        ]
    },
    {
        id: 2,
        title: "Unit 2: Logic & Control",
        description: "If/Else Statements and Loops",
        color: "bg-blue-500",
        lessons: [
            { id: 6, icon: Star, status: 'locked', stars: 0 },
            { id: 7, icon: Star, status: 'locked', stars: 0 },
            { id: 8, icon: Star, status: 'locked', stars: 0 },
            { id: 9, icon: Trophy, status: 'locked', stars: 0, isBoss: true },
        ]
    }
  ];

  // Mock Leaderboard
  const leaderboard = [
    { rank: 1, name: "MasterLuau", xp: 1250, avatar: "bg-purple-500" },
    { rank: 2, name: "RobloxDev99", xp: 980, avatar: "bg-green-500" },
    { rank: 3, name: "Novice Coder (You)", xp: stats.xp, avatar: "bg-gray-600", isMe: true },
    { rank: 4, name: "ScriptKiddie", xp: 320, avatar: "bg-yellow-500" },
    { rank: 5, name: "Guest_123", xp: 150, avatar: "bg-red-500" },
  ];

  return (
    <div className="absolute inset-0 bg-[#0f1219] overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PATHWAY (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-12 pb-24">
            
            {units.map((unit, unitIdx) => (
                <div key={unit.id} className="relative">
                    {/* Unit Header */}
                    <div className={`${unit.color} rounded-2xl p-6 mb-8 flex items-center justify-between shadow-lg shadow-${unit.color}/20`}>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{unit.title}</h2>
                            <p className="text-white/80">{unit.description}</p>
                        </div>
                        <div className="text-2xl font-bold text-white/90">
                            Unit {unit.id}
                        </div>
                    </div>

                    {/* Path Nodes */}
                    <div className="relative flex flex-col items-center gap-6">
                        {/* Connecting Line (Simple SVG background for visual flow) */}
                        {/* Note: A real production app would calculate this dynamically based on node positions */}
                        
                        {unit.lessons.map((lesson, idx) => {
                            // Zig-Zag Logic
                            // 0: center, 1: left, 2: center, 3: right, 4: center
                            let translateX = 'translate-x-0';
                            if (idx % 4 === 1) translateX = '-translate-x-12 md:-translate-x-20';
                            if (idx % 4 === 3) translateX = 'translate-x-12 md:translate-x-20';

                            const isUnlocked = lesson.status === 'completed' || lesson.status === 'current';
                            const isCurrent = lesson.status === 'current';
                            
                            return (
                                <div key={lesson.id} className={`relative z-10 ${translateX}`}>
                                    {/* The Node Button */}
                                    <div className="relative group">
                                        <div 
                                            onClick={() => isUnlocked && onStartLevel()}
                                            className={`
                                                w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-b-8 transition-all duration-150 active:border-b-0 active:translate-y-2 cursor-pointer
                                                ${isCurrent 
                                                    ? 'bg-roblox-accent border-red-700 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse-slow' 
                                                    : lesson.status === 'completed'
                                                        ? 'bg-roblox-gold border-yellow-600'
                                                        : 'bg-gray-700 border-gray-600 opacity-60 cursor-not-allowed'
                                                }
                                            `}
                                        >
                                            {lesson.status === 'completed' ? (
                                                <Check size={40} className="text-white drop-shadow-md" strokeWidth={4} />
                                            ) : lesson.isBoss ? (
                                                <Trophy size={40} className={`${isUnlocked ? 'text-white' : 'text-gray-500'} drop-shadow-md`} fill={isUnlocked ? "currentColor" : "none"} />
                                            ) : (
                                                <Star size={40} className={`${isUnlocked ? 'text-white' : 'text-gray-500'} drop-shadow-md`} fill={isUnlocked ? "currentColor" : "none"} />
                                            )}
                                            
                                            {/* Stars Floating Display */}
                                            {lesson.status === 'completed' && (
                                                <div className="absolute -bottom-8 flex gap-1 bg-gray-900/80 px-2 py-1 rounded-full border border-gray-700">
                                                    {[1, 2, 3].map((s) => (
                                                        <Star 
                                                            key={s} 
                                                            size={10} 
                                                            className={s <= lesson.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Tooltip for Current Lesson */}
                                        {isCurrent && (
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-roblox-dark font-bold px-4 py-2 rounded-xl whitespace-nowrap animate-bounce shadow-lg">
                                                START
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            
            <div className="flex justify-center pt-8 opacity-50">
                 <div className="flex flex-col items-center text-gray-500">
                     <Lock size={32} className="mb-2" />
                     <p>Complete Unit 2 to unlock more!</p>
                 </div>
            </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR (4 cols) - Sticky on Desktop */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="sticky top-24 space-y-6">
                
                {/* Profile Card */}
                <div className="bg-gray-800 rounded-2xl border-2 border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center border-2 border-gray-500 overflow-hidden">
                            <User size={32} className="text-gray-300" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Novice Coder</h3>
                            <p className="text-sm text-gray-400">Joined Jan 2025</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-700">
                             <div className="text-xs text-gray-400 uppercase font-bold mb-1">Total XP</div>
                             <div className="text-xl font-bold text-roblox-gold flex items-center gap-2">
                                <Zap size={18} fill="currentColor" />
                                {stats.xp}
                             </div>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-700">
                             <div className="text-xs text-gray-400 uppercase font-bold mb-1">League</div>
                             <div className="text-xl font-bold text-purple-400 flex items-center gap-2">
                                <Shield size={18} fill="currentColor" />
                                Bronze
                             </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onNavigate(ViewState.PROFILE)}
                        className="w-full mt-4 py-2 text-sm font-bold text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors uppercase tracking-wider"
                    >
                        View Full Profile
                    </button>
                </div>

                {/* Review Card */}
                <div className="bg-gray-800 rounded-2xl border-2 border-gray-700 p-6">
                     <h3 className="text-lg font-bold text-white mb-2">Practice</h3>
                     <p className="text-gray-400 text-sm mb-4">Review past lessons to restore hearts and gain XP.</p>
                     <button 
                        onClick={() => onNavigate(ViewState.QUIZ)}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                     >
                        <Dumbbell size={20} />
                        Random Review
                     </button>
                </div>

                {/* Leaderboard */}
                <div className="bg-gray-800 rounded-2xl border-2 border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Ranking</h3>
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Diamond League</span>
                    </div>

                    <div className="space-y-2">
                        {leaderboard.map((user) => (
                            <div 
                                key={user.rank}
                                className={`flex items-center gap-3 p-2 rounded-lg ${user.isMe ? 'bg-gray-700 border border-gray-600' : 'hover:bg-gray-700/50'}`}
                            >
                                <div className={`w-6 text-center font-bold ${user.rank <= 3 ? 'text-roblox-gold' : 'text-gray-500'}`}>
                                    {user.rank}
                                </div>
                                <div className={`w-8 h-8 rounded-full ${user.avatar}`}></div>
                                <div className={`flex-1 font-medium ${user.isMe ? 'text-white' : 'text-gray-400'}`}>
                                    {user.name}
                                </div>
                                <div className="text-sm font-bold text-gray-300">
                                    {user.xp} XP
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => onNavigate(ViewState.LEADERBOARD)}
                        className="w-full mt-4 text-center text-sm text-roblox-accent font-bold hover:underline"
                    >
                        View All
                    </button>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};