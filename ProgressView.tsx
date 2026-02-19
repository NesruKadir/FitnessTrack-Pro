import { useState } from 'react';
import type { UserStats, WorkoutLog } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Calendar, 
  Dumbbell, 
  Clock, 
  Trophy,
  Flame,
  BarChart3,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ProgressViewProps {
  userStats: UserStats;
  workoutLogs: WorkoutLog[];
}

export function ProgressView({ userStats, workoutLogs }: ProgressViewProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');
  const [chartType, setChartType] = useState<'volume' | 'duration' | 'frequency'>('volume');

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

  // Prepare chart data
  const sortedLogs = [...workoutLogs].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const chartData = sortedLogs.map(log => ({
    date: log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    volume: log.totalVolume,
    duration: log.duration,
    sets: log.totalSets
  }));

  // Calculate stats by workout type
  const workoutTypeStats = workoutLogs.reduce((acc, log) => {
    const type = log.sessionName;
    if (!acc[type]) {
      acc[type] = { count: 0, totalDuration: 0, totalVolume: 0 };
    }
    acc[type].count++;
    acc[type].totalDuration += log.duration;
    acc[type].totalVolume += log.totalVolume;
    return acc;
  }, {} as Record<string, { count: number; totalDuration: number; totalVolume: number }>);

  const pieData = Object.entries(workoutTypeStats).map(([name, stats]) => ({
    name,
    value: stats.count
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Calculate weekly stats
  const last7Days = workoutLogs.filter(log => {
    const daysDiff = (Date.now() - log.date.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  });

  const weeklyWorkouts = last7Days.length;
  const weeklyDuration = last7Days.reduce((acc, log) => acc + log.duration, 0);
  const weeklyVolume = last7Days.reduce((acc, log) => acc + log.totalVolume, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Progress</h1>
          <p className="text-muted-foreground mt-1">
            Track your fitness journey and achievements
          </p>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* All-Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
                <p className="text-3xl font-bold mt-1">{userStats.totalWorkouts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-3xl font-bold mt-1">{formatDuration(userStats.totalDuration)}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-3xl font-bold mt-1">{formatVolume(userStats.totalVolume)}</p>
                <p className="text-xs text-muted-foreground">lbs lifted</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Best Streak</p>
                <p className="text-3xl font-bold mt-1">{userStats.longestStreak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* This Week Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{weeklyWorkouts}</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{formatDuration(weeklyDuration)}</p>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{formatVolume(weeklyVolume)}</p>
              <p className="text-sm text-muted-foreground">Volume (lbs)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Workout Trends
            </CardTitle>
            <div className="flex gap-2">
              {(['volume', 'duration', 'frequency'] as const).map((type) => (
                <Button
                  key={type}
                  variant={chartType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey={chartType === 'frequency' ? 'sets' : chartType}
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Workout Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Workout Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userStats.totalWorkouts >= 10 && (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">10 Workouts Complete</p>
                    <p className="text-xs text-muted-foreground">You've completed 10+ workouts!</p>
                  </div>
                </div>
              )}
              {userStats.currentStreak >= 5 && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">5-Day Streak</p>
                    <p className="text-xs text-muted-foreground">Keep the momentum going!</p>
                  </div>
                </div>
              )}
              {userStats.totalDuration >= 600 && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">10+ Hours Trained</p>
                    <p className="text-xs text-muted-foreground">Dedicated athlete!</p>
                  </div>
                </div>
              )}
              {userStats.totalVolume >= 10000 && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Volume Beast</p>
                    <p className="text-xs text-muted-foreground">10,000+ lbs lifted!</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workout History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Workout History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workoutLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{log.sessionName}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">{log.duration}m</p>
                    <p className="text-muted-foreground">Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{log.totalSets}</p>
                    <p className="text-muted-foreground">Sets</p>
                  </div>
                  {log.totalVolume > 0 && (
                    <div className="text-center">
                      <p className="font-semibold">{formatVolume(log.totalVolume)}</p>
                      <p className="text-muted-foreground">Volume</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
