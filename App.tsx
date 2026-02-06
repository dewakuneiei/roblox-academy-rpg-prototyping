import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { CodeArena } from './pages/CodeArena';
import { Quiz } from './pages/Quiz';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { ViewState, UserStats } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    xp: 450,
    maxXp: 1000,
    hearts: 5,
    maxHearts: 5,
    gems: 120,
    streak: 3
  });

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleStartLevel = () => {
    setCurrentView(ViewState.LESSON);
  };

  const handleLessonComplete = () => {
    // Transition from Lesson to Coding
    setCurrentView(ViewState.CODE_ARENA);
  };

  const handleCodeSuccess = () => {
    // Award XP
    setUserStats(prev => ({
        ...prev,
        xp: prev.xp + 100,
        gems: prev.gems + 20
    }));
    // Maybe go to Quiz or back to Dashboard
    setTimeout(() => {
        setCurrentView(ViewState.QUIZ);
    }, 1500);
  };

  const handleQuizFinish = () => {
     setCurrentView(ViewState.DASHBOARD);
  };

  return (
    <div className="flex flex-col h-screen bg-roblox-dark text-white font-sans selection:bg-roblox-accent selection:text-white overflow-hidden">
      {/* Top HUD - Now Full Width */}
      <TopBar 
        stats={userStats} 
        currentView={currentView}
        onNavigate={handleNavigate} 
      />

      {/* Main Content Area - Full Width */}
      <main className="flex-1 relative overflow-hidden">
        {currentView === ViewState.DASHBOARD && (
          <Dashboard 
            stats={userStats}
            onStartLevel={handleStartLevel} 
            onNavigate={handleNavigate}
          />
        )}
        
        {currentView === ViewState.LESSON && (
          <Lesson onComplete={handleLessonComplete} onExit={() => setCurrentView(ViewState.DASHBOARD)} />
        )}

        {currentView === ViewState.CODE_ARENA && (
          <CodeArena onSuccess={handleCodeSuccess} />
        )}

        {currentView === ViewState.QUIZ && (
          <Quiz onFinish={handleQuizFinish} />
        )}

        {currentView === ViewState.LEADERBOARD && (
          <Leaderboard stats={userStats} />
        )}

        {currentView === ViewState.PROFILE && (
          <Profile stats={userStats} />
        )}
      </main>
    </div>
  );
};

export default App;