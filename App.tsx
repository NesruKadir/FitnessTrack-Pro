import { useState } from 'react';
import type { View, ActiveWorkout, WorkoutSession, WorkoutLog, UserStats } from '@/types';
import { exercises, workoutSessions, defaultUserStats, sampleWorkoutLogs } from '@/data/exercises';
import { Dashboard } from '@/sections/Dashboard';
import { WorkoutPlans } from '@/sections/WorkoutPlans';
import { ExerciseLibrary } from '@/sections/ExerciseLibrary';
import { ActiveWorkoutView } from '@/sections/ActiveWorkoutView';
import { ProgressView } from '@/sections/ProgressView';
import { Button } from '@/components/ui/button';
import { 
  Dumbbell, 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Play,
  User,
  Flame,
  Trophy,
  Target
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(sampleWorkoutLogs);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const startWorkout = (session: WorkoutSession) => {
    const newActiveWorkout: ActiveWorkout = {
      sessionId: session.id,
      startTime: new Date(),
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      exercises: session.exercises.map(e => ({
        ...e,
        sets: e.sets.map(s => ({ ...s, completed: false }))
      })),
      isResting: false
    };
    setActiveWorkout(newActiveWorkout);
    setCurrentView('active');
    toast.success(`Started: ${session.name}`);
  };

  const completeWorkout = () => {
    if (!activeWorkout) return;
    
    const session = workoutSessions.find(s => s.id === activeWorkout.sessionId);
    if (!session) return;

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - activeWorkout.startTime.getTime()) / 60000);
    
    const completedExercises = activeWorkout.exercises.filter(e => 
      e.sets.some(s => s.completed)
    ).length;
    
    const totalSets = activeWorkout.exercises.reduce((acc, e) => 
      acc + e.sets.filter(s => s.completed).length, 0
    );
    
    const totalVolume = activeWorkout.exercises.reduce((acc, e) => 
      acc + e.sets.filter(s => s.completed).reduce((setAcc, s) => 
        setAcc + (s.weight * s.reps), 0
      ), 0
    );

    const newLog: WorkoutLog = {
      id: Date.now().toString(),
      sessionId: session.id,
      sessionName: session.name,
      date: endTime,
      duration,
      exercisesCompleted: completedExercises,
      totalSets,
      totalVolume
    };

    setWorkoutLogs([newLog, ...workoutLogs]);
    setUserStats({
      ...userStats,
      totalWorkouts: userStats.totalWorkouts + 1,
      totalDuration: userStats.totalDuration + duration,
      totalVolume: userStats.totalVolume + totalVolume,
      currentStreak: userStats.currentStreak + 1,
      weeklyCompleted: Math.min(userStats.weeklyCompleted + 1, userStats.weeklyGoal)
    });
    
    setActiveWorkout(null);
    setCurrentView('dashboard');
    toast.success('Workout completed! Great job!');
  };

  const cancelWorkout = () => {
    setActiveWorkout(null);
    setCurrentView('dashboard');
    toast.info('Workout cancelled');
  };

  const updateActiveWorkout = (updated: ActiveWorkout) => {
    setActiveWorkout(updated);
  };

  const navItems = [
    { view: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { view: 'workouts' as View, label: 'Workout Plans', icon: Dumbbell },
    { view: 'exercises' as View, label: 'Exercises', icon: BookOpen },
    { view: 'progress' as View, label: 'Progress', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">FitTrack</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ml-auto"
          >
            <span className="sr-only">Toggle sidebar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        <nav className="px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === item.view 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {isSidebarOpen && activeWorkout && (
          <div className="mx-4 mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 text-primary">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Workout Active</span>
            </div>
            <Button 
              size="sm" 
              className="w-full mt-2"
              onClick={() => setCurrentView('active')}
            >
              Resume
            </Button>
          </div>
        )}

        {isSidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Fitness Enthusiast</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>{userStats.currentStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Top Stats Bar */}
        {currentView !== 'active' && (
          <div className="bg-card border-b border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">
                    <span className="font-semibold">{userStats.totalWorkouts}</span>
                    <span className="text-muted-foreground ml-1">workouts</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    <span className="font-semibold">{userStats.weeklyCompleted}/{userStats.weeklyGoal}</span>
                    <span className="text-muted-foreground ml-1">this week</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">
                    <span className="font-semibold">{userStats.currentStreak}</span>
                    <span className="text-muted-foreground ml-1">day streak</span>
                  </span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {currentView === 'dashboard' && (
            <Dashboard 
              userStats={userStats}
              recentWorkouts={workoutLogs.slice(0, 5)}
              onStartWorkout={() => setCurrentView('workouts')}
              onViewProgress={() => setCurrentView('progress')}
            />
          )}
          {currentView === 'workouts' && (
            <WorkoutPlans 
              sessions={workoutSessions}
              onStartWorkout={startWorkout}
            />
          )}
          {currentView === 'exercises' && (
            <ExerciseLibrary exercises={exercises} />
          )}
          {currentView === 'active' && activeWorkout && (
            <ActiveWorkoutView
              activeWorkout={activeWorkout}
              onUpdate={updateActiveWorkout}
              onComplete={completeWorkout}
              onCancel={cancelWorkout}
            />
          )}
          {currentView === 'progress' && (
            <ProgressView 
              userStats={userStats}
              workoutLogs={workoutLogs}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
