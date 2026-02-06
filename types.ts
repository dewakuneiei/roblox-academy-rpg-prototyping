export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  LESSON = 'LESSON',
  CODE_ARENA = 'CODE_ARENA',
  QUIZ = 'QUIZ',
  LEADERBOARD = 'LEADERBOARD',
  PROFILE = 'PROFILE',
}

export interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  hearts: number;
  maxHearts: number;
  gems: number;
  streak: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown-like or text
  type: 'concept' | 'practice' | 'battle';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}