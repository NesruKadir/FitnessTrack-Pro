export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight';
  muscleGroups: string[];
  description: string;
  instructions: string[];
  tips?: string[];
  equipment?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  restSeconds: number;
}

export interface WorkoutSession {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface ActiveWorkout {
  sessionId: string;
  startTime: Date;
  currentExerciseIndex: number;
  currentSetIndex: number;
  exercises: WorkoutExercise[];
  isResting: boolean;
  restEndTime?: Date;
}

export interface WorkoutLog {
  id: string;
  sessionId: string;
  sessionName: string;
  date: Date;
  duration: number;
  exercisesCompleted: number;
  totalSets: number;
  totalVolume: number;
}

export interface UserStats {
  totalWorkouts: number;
  totalDuration: number;
  totalVolume: number;
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyCompleted: number;
}

export type View = 'dashboard' | 'workouts' | 'exercises' | 'active' | 'progress';
