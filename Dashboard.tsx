import type { UserStats, WorkoutLog } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Clock, 
  TrendingUp, 
  Flame, 
  Trophy,
  Calendar,
  ArrowRight,
  Play,
  Target,
  Activity,
  Zap
} from 'lucide-react';

interface DashboardProps {
  userStats: UserStats;
  recentWorkouts: WorkoutLog[];
  onStartWorkout: () => void;
  onViewProgress: () => void;
}

export function Dashboard({ userStats, recentWorkouts, onStartWorkout, onViewProgress }: DashboardProps) {
  const weeklyProgress = (userStats.weeklyCompleted / userStats.weeklyGoal) * 100;
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}k`;
    return volume.toString();
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back! 💪</h1>
          <p className="text-muted-foreground mt-1">
            Ready to crush your fitness goals today?
          </p>
        </div>
        <Button onClick={onStartWorkout} size="lg" className="gap-2">
          <Play className="w-4 h-4" />
          Start Workout
        </Button>
      </div>

      {/* Weekly Goal Progress */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Weekly Goal</h3>
                <p className="text-sm text-muted-foreground">
                  {userStats.weeklyCompleted} of {userStats.weeklyGoal} workouts completed
                </p>
              </div>
            </div>
            <span className="text-2xl font-bold text-primary">{Math.round(weeklyProgress)}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-3">
            {userStats.weeklyGoal - userStats.weeklyCompleted > 0 
              ? `${userStats.weeklyGoal - userStats.weeklyCompleted} more workouts to reach your goal!`
              : 'Weekly goal achieved! Amazing work! 🎉'}
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
                <p className="text-3xl font-bold mt-1">{userStats.totalWorkouts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-3xl font-bold mt-1">{formatDuration(userStats.totalDuration)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-3xl font-bold mt-1">{formatVolume(userStats.totalVolume)} <span className="text-sm font-normal text-muted-foreground">lbs</span></p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold mt-1">{userStats.currentStreak} <span className="text-sm font-normal text-muted-foreground">days</span></p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Workouts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Workouts
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onViewProgress}>
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {recentWorkouts.length > 0 ? (
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div 
                    key={workout.id} 
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {index < 3 ? <Trophy className="w-5 h-5" /> : <Dumbbell className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{workout.sessionName}</p>
                        <p className="text-sm text-muted-foreground">
                          {workout.date.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{workout.duration}m</p>
                        <p className="text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{workout.totalSets}</p>
                        <p className="text-muted-foreground">Sets</p>
                      </div>
                      {workout.totalVolume > 0 && (
                        <div className="text-center">
                          <p className="font-semibold">{formatVolume(workout.totalVolume)}</p>
                          <p className="text-muted-foreground">Volume</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No workouts yet. Start your first one today!</p>
                <Button onClick={onStartWorkout} className="mt-4">
                  Start Workout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onStartWorkout} className="w-full justify-start gap-2">
                <Play className="w-4 h-4" />
                Start New Workout
              </Button>
              <Button variant="outline" onClick={onViewProgress} className="w-full justify-start gap-2">
                <TrendingUp className="w-4 h-4" />
                View Progress
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                Motivation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic">
                "The only bad workout is the one that didn't happen."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Keep pushing! You're {userStats.currentStreak} days into your streak.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Personal Bests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Longest Streak</span>
                <span className="font-semibold">{userStats.longestStreak} days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Workouts</span>
                <span className="font-semibold">{userStats.totalWorkouts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Hours Trained</span>
                <span className="font-semibold">{Math.floor(userStats.totalDuration / 60)}h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
