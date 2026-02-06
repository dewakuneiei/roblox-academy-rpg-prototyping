import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { UserStats } from '../types';

interface LeaderboardProps {
    stats: UserStats;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ stats }) => {
    // Mock Data
    const users = [
        { rank: 1, name: "MasterLuau", xp: 1450, avatar: "bg-purple-500", status: "online" },
        { rank: 2, name: "RobloxDev99", xp: 1200, avatar: "bg-green-500", status: "offline" },
        { rank: 3, name: "CodeNinja", xp: 1150, avatar: "bg-blue-500", status: "online" },
        { rank: 4, name: "ScriptKiddie", xp: 900, avatar: "bg-yellow-500", status: "offline" },
        { rank: 5, name: "Novice Coder (You)", xp: stats.xp, avatar: "bg-gray-600", status: "online", isMe: true },
        { rank: 6, name: "Guest_123", xp: 300, avatar: "bg-red-500", status: "offline" },
        { rank: 7, name: "BuilderMan", xp: 250, avatar: "bg-orange-500", status: "offline" },
        { rank: 8, name: "Noob101", xp: 100, avatar: "bg-pink-500", status: "online" },
        { rank: 9, name: "LuaLearner", xp: 50, avatar: "bg-teal-500", status: "offline" },
        { rank: 10, name: "AFK_User", xp: 0, avatar: "bg-indigo-500", status: "offline" },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-[#0f1219] p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-2xl mb-4 border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        <Shield size={40} className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Diamond League</h2>
                    <p className="text-gray-400 mt-2">Top 10 players advance to the Ruby League</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-4 border-b border-gray-800 bg-gray-800/50 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <span>Rank</span>
                        <span>User</span>
                        <span>XP</span>
                    </div>

                    {users.map((user) => (
                        <div 
                            key={user.rank}
                            className={`
                                flex items-center p-4 border-b border-gray-800 last:border-0 transition-colors
                                ${user.isMe ? 'bg-roblox-dark border-l-4 border-l-roblox-accent' : 'hover:bg-gray-800/30'}
                            `}
                        >
                            <div className="w-12 font-bold text-xl flex justify-center">
                                {user.rank === 1 && <span className="text-yellow-400 drop-shadow-md">1</span>}
                                {user.rank === 2 && <span className="text-gray-300 drop-shadow-md">2</span>}
                                {user.rank === 3 && <span className="text-orange-400 drop-shadow-md">3</span>}
                                {user.rank > 3 && <span className="text-gray-500">{user.rank}</span>}
                            </div>
                            
                            <div className="flex-1 flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center font-bold text-white relative`}>
                                    {user.name[0]}
                                    {user.status === 'online' && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <div className={`font-bold ${user.isMe ? 'text-roblox-success' : 'text-white'}`}>
                                        {user.name} {user.isMe && "(You)"}
                                    </div>
                                    {user.rank <= 3 && (
                                        <div className="text-xs text-yellow-500 font-bold">Top 3 🔥</div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="font-bold text-gray-300 flex items-center gap-2 w-24 justify-end">
                                {user.xp}
                                <span className="text-xs text-gray-500">XP</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl border border-purple-500/30 text-center">
                    <p className="text-gray-300 mb-4">You are in the <span className="text-purple-400 font-bold">Promotion Zone</span>!</p>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">2 days left in this tournament</p>
                </div>
            </div>
        </div>
    );
};