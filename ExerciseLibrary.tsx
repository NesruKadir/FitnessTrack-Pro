import { useState } from 'react';
import type { Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Dumbbell, 
  Heart, 
  Zap, 
  Target,
  Info,
  Filter,
  ChevronRight,
  Lightbulb,
  List
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ExerciseLibraryProps {
  exercises: Exercise[];
}

export function ExerciseLibrary({ exercises }: ExerciseLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = ['all', 'strength', 'cardio', 'flexibility', 'bodyweight'];
  
  const allMuscleGroups = Array.from(new Set(
    exercises.flatMap(e => e.muscleGroups)
  )).sort();

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesMuscle = selectedMuscle === 'all' || exercise.muscleGroups.includes(selectedMuscle);
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  const toggleFavorite = (exerciseId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(exerciseId)) {
      newFavorites.delete(exerciseId);
      toast.info('Removed from favorites');
    } else {
      newFavorites.add(exerciseId);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return <Dumbbell className="w-4 h-4" />;
      case 'cardio': return <Zap className="w-4 h-4" />;
      case 'flexibility': return <Target className="w-4 h-4" />;
      case 'bodyweight': return <Heart className="w-4 h-4" />;
      default: return <Dumbbell className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Exercise Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse our collection of {exercises.length} exercises
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
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
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flexibility</option>
            <option value="bodyweight">Bodyweight</option>
          </select>
          <select
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="all">All Muscles</option>
            {allMuscleGroups.map(muscle => (
              <option key={muscle} value={muscle}>
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(exercise.category)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{exercise.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="secondary" className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(exercise.id)}
                  className={favorites.has(exercise.id) ? 'text-red-500' : 'text-muted-foreground'}
                >
                  <Heart className={`w-4 h-4 ${favorites.has(exercise.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {exercise.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {exercise.muscleGroups.slice(0, 3).map(muscle => (
                  <Badge key={muscle} variant="outline" className="text-xs">
                    {muscle}
                  </Badge>
                ))}
                {exercise.muscleGroups.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{exercise.muscleGroups.length - 3}
                  </Badge>
                )}
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Info className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {exercise.name}
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>{exercise.description}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    {/* Muscle Groups */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Target Muscles
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exercise.muscleGroups.map(muscle => (
                          <Badge key={muscle} variant="secondary">
                            {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Equipment */}
                    {exercise.equipment && exercise.equipment.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Dumbbell className="w-4 h-4" />
                          Equipment Needed
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exercise.equipment.map(eq => (
                            <Badge key={eq} variant="outline">
                              {eq.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Instructions
                      </h4>
                      <ol className="space-y-2">
                        {exercise.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex gap-3 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                              {idx + 1}
                            </span>
                            <span className="pt-0.5">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tips */}
                    {exercise.tips && exercise.tips.length > 0 && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-400">
                          <Lightbulb className="w-4 h-4" />
                          Pro Tips
                        </h4>
                        <ul className="space-y-1">
                          {exercise.tips.map((tip, idx) => (
                            <li key={idx} className="text-sm text-amber-700 dark:text-amber-500 flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No exercises match your filters</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMuscle('all');
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
