import React from 'react';
import { User, Zap, Shield, Flame, Clock, Award, Edit, Sword } from 'lucide-react';
import { UserStats } from '../types';

interface ProfileProps {
    stats: UserStats;
}

export const Profile: React.FC<ProfileProps> = ({ stats }) => {
    return (
        <div className="flex-1 overflow-y-auto bg-[#0f1219] p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Profile Info */}
                <div className="bg-gray-800 border-2 border-gray-700 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                     {/* Edit Button */}
                     <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-700/50 rounded-lg">
                        <Edit size={20} />
                     </button>

                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-600 border-4 border-roblox-dark flex items-center justify-center shadow-2xl relative group cursor-pointer">
                        <User size={64} className="text-gray-300" />
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold uppercase tracking-wider">Change</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Novice Coder</h1>
                        <p className="text-gray-400 mb-4">Joined January 2025</p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-3 py-1 bg-roblox-dark rounded-lg text-sm text-gray-300 border border-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Online
                            </div>
                            <div className="px-3 py-1 bg-roblox-dark rounded-lg text-sm text-gray-300 border border-gray-700">
                                0 Following
                            </div>
                            <div className="px-3 py-1 bg-roblox-dark rounded-lg text-sm text-gray-300 border border-gray-700">
                                0 Followers
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
                            <Flame size={24} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">{stats.streak}</div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Day Streak</div>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">{stats.xp}</div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Total XP</div>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center">
                            <Shield size={24} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">Bronze</div>
                            <div className="text-xs text-gray-400 uppercase font-bold">League</div>
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                            <Clock size={24} />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-white">12</div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Top 3 Finishes</div>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
                <div className="space-y-4">
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4 opacity-100">
                        <div className="w-16 h-16 bg-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-600/50">
                            <Award size={32} className="text-yellow-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white">Wildfire</h3>
                            <p className="text-sm text-gray-400">Reach a 3 day streak</p>
                            <div className="mt-2 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-full"></div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded uppercase">
                            Level 1
                        </div>
                    </div>

                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4 opacity-60 grayscale">
                        <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                            <Award size={32} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white">Sage</h3>
                            <p className="text-sm text-gray-400">Earn 1000 XP in a single day</p>
                            <div className="mt-2 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-500 w-1/4"></div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-gray-700 text-gray-400 text-xs font-bold rounded uppercase">
                            Locked
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-4 opacity-60 grayscale">
                        <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                            <Sword size={32} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white">Challenger</h3>
                            <p className="text-sm text-gray-400">Win 5 Code Arena challenges without errors</p>
                            <div className="mt-2 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-500 w-0"></div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-gray-700 text-gray-400 text-xs font-bold rounded uppercase">
                            Locked
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};