import { useState, useEffect } from 'react';
import type { ActiveWorkout } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Clock,
  Flame,
  Trophy,
  X,
  Volume2,
  VolumeX,
  Minus,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface ActiveWorkoutViewProps {
  activeWorkout: ActiveWorkout;
  onUpdate: (workout: ActiveWorkout) => void;
  onComplete: () => void;
  onCancel: () => void;
}

export function ActiveWorkoutView({ 
  activeWorkout, 
  onUpdate, 
  onComplete, 
  onCancel 
}: ActiveWorkoutViewProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [isRestActive, setIsRestActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  const currentExercise = activeWorkout.exercises[activeWorkout.currentExerciseIndex];
  const currentSet = currentExercise?.sets[activeWorkout.currentSetIndex];
  const totalSets = activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = activeWorkout.exercises.reduce((acc, ex) => 
    acc + ex.sets.filter(s => s.completed).length, 0
  );
  const progress = (completedSets / totalSets) * 100;

  // Main timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - activeWorkout.startTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWorkout.startTime]);

  // Rest timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRestActive && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRestActive(false);
            if (soundEnabled) {
              toast.success('Rest complete! Next set ready.');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestActive, restTimeRemaining, soundEnabled]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRest = () => {
    setRestTimeRemaining(currentExercise.restSeconds);
    setIsRestActive(true);
  };

  const skipRest = () => {
    setIsRestActive(false);
    setRestTimeRemaining(0);
  };

  const updateSet = (field: 'reps' | 'weight', value: number) => {
    const updatedExercises = [...activeWorkout.exercises];
    updatedExercises[activeWorkout.currentExerciseIndex].sets[activeWorkout.currentSetIndex][field] = value;
    onUpdate({ ...activeWorkout, exercises: updatedExercises });
  };

  const completeSet = () => {
    const updatedExercises = [...activeWorkout.exercises];
    updatedExercises[activeWorkout.currentExerciseIndex].sets[activeWorkout.currentSetIndex].completed = true;

    let nextExerciseIndex = activeWorkout.currentExerciseIndex;
    let nextSetIndex = activeWorkout.currentSetIndex + 1;

    // Move to next exercise if all sets completed
    if (nextSetIndex >= currentExercise.sets.length) {
      nextExerciseIndex++;
      nextSetIndex = 0;
    }

    // Check if workout is complete
    if (nextExerciseIndex >= activeWorkout.exercises.length) {
      onUpdate({ ...activeWorkout, exercises: updatedExercises });
      setShowCompleteConfirm(true);
      return;
    }

    onUpdate({
      ...activeWorkout,
      exercises: updatedExercises,
      currentExerciseIndex: nextExerciseIndex,
      currentSetIndex: nextSetIndex,
      isResting: true
    });

    startRest();
    toast.success('Set completed!');
  };

  const goToPrevious = () => {
    if (activeWorkout.currentSetIndex > 0) {
      onUpdate({
        ...activeWorkout,
        currentSetIndex: activeWorkout.currentSetIndex - 1
      });
    } else if (activeWorkout.currentExerciseIndex > 0) {
      const prevExercise = activeWorkout.exercises[activeWorkout.currentExerciseIndex - 1];
      onUpdate({
        ...activeWorkout,
        currentExerciseIndex: activeWorkout.currentExerciseIndex - 1,
        currentSetIndex: prevExercise.sets.length - 1
      });
    }
  };

  const goToNext = () => {
    if (activeWorkout.currentSetIndex < currentExercise.sets.length - 1) {
      onUpdate({
        ...activeWorkout,
        currentSetIndex: activeWorkout.currentSetIndex + 1
      });
    } else if (activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1) {
      onUpdate({
        ...activeWorkout,
        currentExerciseIndex: activeWorkout.currentExerciseIndex + 1,
        currentSetIndex: 0
      });
    }
  };

  if (showCompleteConfirm) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="text-center p-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Workout Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Great job! You've completed all exercises.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{formatTime(elapsedTime)}</p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{completedSets}</p>
              <p className="text-xs text-muted-foreground">Sets</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{activeWorkout.exercises.length}</p>
              <p className="text-xs text-muted-foreground">Exercises</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowCompleteConfirm(false)} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button onClick={onComplete} className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Finish
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Active Workout</h1>
          <p className="text-muted-foreground">
            {activeWorkout.exercises[0]?.exercise.name && 'Keep pushing!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button variant="destructive" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            End
          </Button>
        </div>
      </div>

      {/* Timer & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Elapsed Time</span>
              </div>
              <span className="text-3xl font-mono font-bold">{formatTime(elapsedTime)}</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {completedSets} of {totalSets} sets completed ({Math.round(progress)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-muted-foreground">Exercise</span>
            </div>
            <p className="text-2xl font-bold">
              {activeWorkout.currentExerciseIndex + 1} <span className="text-muted-foreground text-lg">/ {activeWorkout.exercises.length}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rest Timer Overlay */}
      {isRestActive && (
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Rest Time</h3>
            <p className="text-6xl font-mono font-bold text-primary mb-6">
              {formatTime(restTimeRemaining)}
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={skipRest}>
                Skip Rest
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setRestTimeRemaining(prev => prev + 30)}
              >
                +30s
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Exercise */}
      {!isRestActive && currentExercise && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Exercise {activeWorkout.currentExerciseIndex + 1} of {activeWorkout.exercises.length}
                </p>
                <CardTitle className="text-2xl">{currentExercise.exercise.name}</CardTitle>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Set</p>
                <p className="text-2xl font-bold">
                  {activeWorkout.currentSetIndex + 1} <span className="text-muted-foreground text-lg">/ {currentExercise.sets.length}</span>
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Set Progress Dots */}
            <div className="flex gap-2 justify-center">
              {currentExercise.sets.map((set, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    set.completed 
                      ? 'bg-green-500' 
                      : idx === activeWorkout.currentSetIndex 
                        ? 'bg-primary' 
                        : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Weight & Reps Inputs */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Weight (lbs)</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateSet('weight', Math.max(0, currentSet.weight - 5))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={currentSet.weight}
                    onChange={(e) => updateSet('weight', parseInt(e.target.value) || 0)}
                    className="text-center text-2xl font-bold"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateSet('weight', currentSet.weight + 5)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Reps</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateSet('reps', Math.max(0, currentSet.reps - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={currentSet.reps}
                    onChange={(e) => updateSet('reps', parseInt(e.target.value) || 0)}
                    className="text-center text-2xl font-bold"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateSet('reps', currentSet.reps + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={activeWorkout.currentExerciseIndex === 0 && activeWorkout.currentSetIndex === 0}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={completeSet}
                className="flex-1"
                size="lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete Set
              </Button>
              <Button
                variant="outline"
                onClick={goToNext}
                disabled={
                  activeWorkout.currentExerciseIndex === activeWorkout.exercises.length - 1 &&
                  activeWorkout.currentSetIndex === currentExercise.sets.length - 1
                }
                className="flex-1"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercise List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Workout Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activeWorkout.exercises.map((ex, idx) => {
              const completedSetsCount = ex.sets.filter(s => s.completed).length;
              const isCurrent = idx === activeWorkout.currentExerciseIndex;
              
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isCurrent ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completedSetsCount === ex.sets.length
                        ? 'bg-green-500 text-white'
                        : isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {completedSetsCount === ex.sets.length ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className={isCurrent ? 'font-medium' : ''}>{ex.exercise.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completedSetsCount}/{ex.sets.length} sets
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
