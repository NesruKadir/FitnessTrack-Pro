import { useState } from 'react';
import type { WorkoutSession } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Play, 
  Clock, 
  Dumbbell, 
  Filter,
  Flame,
  Target,
  Zap,
  Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface WorkoutPlansProps {
  sessions: WorkoutSession[];
  onStartWorkout: (session: WorkoutSession) => void;
}

export function WorkoutPlans({ sessions, onStartWorkout }: WorkoutPlansProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(sessions.map(s => s.category)))];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || session.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || session.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'strength': return <Dumbbell className="w-4 h-4" />;
      case 'cardio': return <Zap className="w-4 h-4" />;
      case 'flexibility': return <Target className="w-4 h-4" />;
      default: return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workout Plans</h1>
          <p className="text-muted-foreground mt-1">
            Choose a workout plan that fits your goals
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(session.category)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{session.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {session.estimatedDuration} min
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {session.description}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className={getDifficultyColor(session.difficulty)}>
                  {session.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {session.exercises.length} exercises
                </Badge>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                    >
                      <Info className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {session.name}
                        <Badge className={getDifficultyColor(session.difficulty)}>
                          {session.difficulty}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription>{session.description}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{session.estimatedDuration} minutes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Dumbbell className="w-4 h-4 text-muted-foreground" />
                          <span>{session.exercises.length} exercises</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Exercises</h4>
                        <div className="space-y-3">
                          {session.exercises.map((ex, idx) => (
                            <div key={idx} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{ex.exercise.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {ex.sets.length} sets × {ex.sets[0]?.reps} reps
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span>Rest: {ex.restSeconds}s</span>
                                {ex.exercise.equipment && ex.exercise.equipment.length > 0 && (
                                  <span>• {ex.exercise.equipment.join(', ')}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        onClick={() => {
                          onStartWorkout(session);
                        }}
                        className="w-full"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start This Workout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  onClick={() => onStartWorkout(session)}
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No workouts match your filters</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
