import type { Exercise, WorkoutSession, UserStats, WorkoutLog } from '@/types';

export const exercises: Exercise[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'strength',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    description: 'A classic compound exercise that targets the chest, shoulders, and triceps.',
    instructions: [
      'Lie flat on a bench with your eyes under the bar',
      'Grip the bar with hands slightly wider than shoulder-width',
      'Lower the bar to your mid-chest',
      'Press the bar back up to the starting position'
    ],
    tips: ['Keep your feet flat on the floor', 'Maintain a slight arch in your back'],
    equipment: ['barbell', 'bench'],
    difficulty: 'intermediate'
  },
  {
    id: 'squat',
    name: 'Barbell Squat',
    category: 'strength',
    muscleGroups: ['quadriceps', 'hamstrings', 'glutes', 'core'],
    description: 'The king of lower body exercises, targeting the entire leg and core.',
    instructions: [
      'Place the bar on your upper back/shoulders',
      'Stand with feet shoulder-width apart',
      'Lower your hips back and down until thighs are parallel to floor',
      'Drive through your heels to stand back up'
    ],
    tips: ['Keep your chest up', 'Don\'t let knees cave inward'],
    equipment: ['barbell', 'squat-rack'],
    difficulty: 'intermediate'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'strength',
    muscleGroups: ['back', 'hamstrings', 'glutes', 'traps'],
    description: 'A full-body compound movement that builds overall strength.',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip the bar',
      'Keep back flat and chest up',
      'Drive through heels to lift the bar, extending hips forward'
    ],
    tips: ['Keep the bar close to your body', 'Engage your lats'],
    equipment: ['barbell'],
    difficulty: 'advanced'
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps', 'core'],
    description: 'Builds strong shoulders and triceps while engaging the core.',
    instructions: [
      'Stand with bar at shoulder height',
      'Grip slightly wider than shoulders',
      'Press the bar straight up overhead',
      'Lower with control back to shoulders'
    ],
    tips: ['Brace your core', 'Don\'t arch your back excessively'],
    equipment: ['barbell'],
    difficulty: 'intermediate'
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'bodyweight',
    muscleGroups: ['back', 'biceps', 'core'],
    description: 'The ultimate bodyweight back exercise.',
    instructions: [
      'Hang from a pull-up bar with palms facing away',
      'Pull your body up until chin is over the bar',
      'Lower with control to full arm extension'
    ],
    tips: ['Engage your core', 'Focus on pulling with your back'],
    equipment: ['pull-up-bar'],
    difficulty: 'intermediate'
  },
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'bodyweight',
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    description: 'Classic bodyweight exercise for chest and arms.',
    instructions: [
      'Start in plank position with hands under shoulders',
      'Lower body until chest nearly touches floor',
      'Push back up to starting position'
    ],
    tips: ['Keep body in a straight line', 'Control the descent'],
    equipment: [],
    difficulty: 'beginner'
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    category: 'bodyweight',
    muscleGroups: ['quadriceps', 'hamstrings', 'glutes'],
    description: 'Great for leg strength, balance, and mobility.',
    instructions: [
      'Step forward into a lunge position',
      'Lower back knee toward ground',
      'Push through front heel to stand',
      'Step forward with opposite leg'
    ],
    tips: ['Keep torso upright', 'Don\'t let front knee go past toes'],
    equipment: [],
    difficulty: 'beginner'
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'bodyweight',
    muscleGroups: ['core', 'shoulders'],
    description: 'Isometric core exercise for stability and strength.',
    instructions: [
      'Start in push-up position',
      'Hold body in straight line from head to heels',
      'Engage core and breathe normally'
    ],
    tips: ['Don\'t let hips sag', 'Keep neck neutral'],
    equipment: [],
    difficulty: 'beginner'
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    description: 'Unilateral back exercise for thickness and strength.',
    instructions: [
      'Place one knee and hand on bench',
      'Hold dumbbell in opposite hand',
      'Pull dumbbell to hip, squeezing back',
      'Lower with control'
    ],
    tips: ['Keep back flat', 'Pull with elbow, not hand'],
    equipment: ['dumbbell', 'bench'],
    difficulty: 'beginner'
  },
  {
    id: 'shoulder-press',
    name: 'Dumbbell Shoulder Press',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps'],
    description: 'Seated or standing shoulder press with dumbbells.',
    instructions: [
      'Hold dumbbells at shoulder height',
      'Press weights overhead until arms extended',
      'Lower with control to starting position'
    ],
    tips: ['Don\'t arch back excessively', 'Control the weight'],
    equipment: ['dumbbell'],
    difficulty: 'beginner'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'strength',
    muscleGroups: ['quadriceps', 'hamstrings', 'glutes'],
    description: 'Machine-based leg exercise for building lower body strength.',
    instructions: [
      'Sit in leg press machine',
      'Place feet shoulder-width on platform',
      'Lower weight by bending knees',
      'Press back to starting position'
    ],
    tips: ['Don\'t lock knees at top', 'Keep lower back against pad'],
    equipment: ['leg-press-machine'],
    difficulty: 'beginner'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    description: 'Machine exercise for back width and strength.',
    instructions: [
      'Sit at lat pulldown machine',
      'Grip bar wider than shoulders',
      'Pull bar down to upper chest',
      'Control the return to starting position'
    ],
    tips: ['Pull with elbows', 'Squeeze shoulder blades together'],
    equipment: ['cable-machine'],
    difficulty: 'beginner'
  },
  {
    id: 'running',
    name: 'Running',
    category: 'cardio',
    muscleGroups: ['legs', 'core'],
    description: 'Classic cardiovascular exercise for endurance and calorie burn.',
    instructions: [
      'Start with warm-up walk or light jog',
      'Maintain steady pace',
      'Focus on breathing rhythm',
      'Cool down with walking'
    ],
    tips: ['Land midfoot', 'Keep arms relaxed'],
    equipment: ['running-shoes'],
    difficulty: 'beginner'
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    muscleGroups: ['full-body'],
    description: 'High-intensity full-body exercise.',
    instructions: [
      'Start standing',
      'Drop to squat, hands on floor',
      'Jump feet back to plank',
      'Do push-up, jump feet in, explode up'
    ],
    tips: ['Maintain pace', 'Modify by stepping instead of jumping'],
    equipment: [],
    difficulty: 'intermediate'
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    muscleGroups: ['full-body'],
    description: 'Simple cardio exercise to elevate heart rate.',
    instructions: [
      'Start with feet together, arms at sides',
      'Jump feet apart while raising arms overhead',
      'Jump back to starting position'
    ],
    tips: ['Stay light on feet', 'Keep rhythm steady'],
    equipment: [],
    difficulty: 'beginner'
  },
  {
    id: 'yoga-flow',
    name: 'Yoga Flow',
    category: 'flexibility',
    muscleGroups: ['full-body'],
    description: 'Dynamic stretching and mobility sequence.',
    instructions: [
      'Start in downward dog',
      'Flow to plank, then upward dog',
      'Return to downward dog',
      'Step forward to forward fold'
    ],
    tips: ['Focus on breath', 'Move with intention'],
    equipment: ['yoga-mat'],
    difficulty: 'beginner'
  },
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    category: 'flexibility',
    muscleGroups: ['hamstrings'],
    description: 'Static stretch for hamstring flexibility.',
    instructions: [
      'Sit with one leg extended',
      'Reach toward toes of extended leg',
      'Hold position, breathing deeply',
      'Switch legs'
    ],
    tips: ['Don\'t bounce', 'Hold for 30 seconds'],
    equipment: [],
    difficulty: 'beginner'
  },
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    category: 'strength',
    muscleGroups: ['biceps'],
    description: 'Isolation exercise for bicep development.',
    instructions: [
      'Hold dumbbells at sides, palms forward',
      'Curl weights toward shoulders',
      'Squeeze at top, lower with control'
    ],
    tips: ['Don\'t swing', 'Keep elbows stationary'],
    equipment: ['dumbbell'],
    difficulty: 'beginner'
  },
  {
    id: 'tricep-dip',
    name: 'Tricep Dip',
    category: 'bodyweight',
    muscleGroups: ['triceps'],
    description: 'Bodyweight exercise for tricep strength.',
    instructions: [
      'Sit on edge of bench or chair',
      'Lower body by bending elbows',
      'Push back up to starting position'
    ],
    tips: ['Keep elbows close to body', 'Don\'t go too low'],
    equipment: ['bench'],
    difficulty: 'beginner'
  },
  {
    id: 'calf-raise',
    name: 'Calf Raise',
    category: 'strength',
    muscleGroups: ['calves'],
    description: 'Isolation exercise for calf development.',
    instructions: [
      'Stand with balls of feet on edge of step',
      'Lower heels below step level',
      'Rise up on toes, squeezing calves'
    ],
    tips: ['Hold at top for squeeze', 'Control the descent'],
    equipment: ['step'],
    difficulty: 'beginner'
  }
];

export const workoutSessions: WorkoutSession[] = [
  {
    id: 'full-body-strength',
    name: 'Full Body Strength',
    description: 'Complete full-body workout targeting all major muscle groups.',
    difficulty: 'intermediate',
    category: 'Strength',
    estimatedDuration: 45,
    exercises: [
      {
        exerciseId: 'squat',
        exercise: exercises.find(e => e.id === 'squat')!,
        sets: [{ reps: 10, weight: 135, completed: false }, { reps: 10, weight: 135, completed: false }, { reps: 10, weight: 135, completed: false }],
        restSeconds: 90
      },
      {
        exerciseId: 'bench-press',
        exercise: exercises.find(e => e.id === 'bench-press')!,
        sets: [{ reps: 10, weight: 135, completed: false }, { reps: 10, weight: 135, completed: false }, { reps: 10, weight: 135, completed: false }],
        restSeconds: 90
      },
      {
        exerciseId: 'dumbbell-row',
        exercise: exercises.find(e => e.id === 'dumbbell-row')!,
        sets: [{ reps: 12, weight: 40, completed: false }, { reps: 12, weight: 40, completed: false }, { reps: 12, weight: 40, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'shoulder-press',
        exercise: exercises.find(e => e.id === 'shoulder-press')!,
        sets: [{ reps: 10, weight: 30, completed: false }, { reps: 10, weight: 30, completed: false }, { reps: 10, weight: 30, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'lunges',
        exercise: exercises.find(e => e.id === 'lunges')!,
        sets: [{ reps: 12, weight: 0, completed: false }, { reps: 12, weight: 0, completed: false }, { reps: 12, weight: 0, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'plank',
        exercise: exercises.find(e => e.id === 'plank')!,
        sets: [{ reps: 60, weight: 0, completed: false }, { reps: 60, weight: 0, completed: false }],
        restSeconds: 45
      }
    ]
  },
  {
    id: 'upper-body-power',
    name: 'Upper Body Power',
    description: 'Focus on chest, back, shoulders, and arms.',
    difficulty: 'intermediate',
    category: 'Strength',
    estimatedDuration: 40,
    exercises: [
      {
        exerciseId: 'bench-press',
        exercise: exercises.find(e => e.id === 'bench-press')!,
        sets: [{ reps: 8, weight: 155, completed: false }, { reps: 8, weight: 155, completed: false }, { reps: 8, weight: 155, completed: false }, { reps: 8, weight: 155, completed: false }],
        restSeconds: 120
      },
      {
        exerciseId: 'pull-up',
        exercise: exercises.find(e => e.id === 'pull-up')!,
        sets: [{ reps: 8, weight: 0, completed: false }, { reps: 8, weight: 0, completed: false }, { reps: 8, weight: 0, completed: false }],
        restSeconds: 90
      },
      {
        exerciseId: 'overhead-press',
        exercise: exercises.find(e => e.id === 'overhead-press')!,
        sets: [{ reps: 10, weight: 95, completed: false }, { reps: 10, weight: 95, completed: false }, { reps: 10, weight: 95, completed: false }],
        restSeconds: 90
      },
      {
        exerciseId: 'dumbbell-row',
        exercise: exercises.find(e => e.id === 'dumbbell-row')!,
        sets: [{ reps: 12, weight: 45, completed: false }, { reps: 12, weight: 45, completed: false }, { reps: 12, weight: 45, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'bicep-curl',
        exercise: exercises.find(e => e.id === 'bicep-curl')!,
        sets: [{ reps: 12, weight: 25, completed: false }, { reps: 12, weight: 25, completed: false }, { reps: 12, weight: 25, completed: false }],
        restSeconds: 45
      },
      {
        exerciseId: 'tricep-dip',
        exercise: exercises.find(e => e.id === 'tricep-dip')!,
        sets: [{ reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }],
        restSeconds: 45
      }
    ]
  },
  {
    id: 'lower-body-focus',
    name: 'Lower Body Focus',
    description: 'Build strong legs and glutes with this targeted workout.',
    difficulty: 'intermediate',
    category: 'Strength',
    estimatedDuration: 35,
    exercises: [
      {
        exerciseId: 'squat',
        exercise: exercises.find(e => e.id === 'squat')!,
        sets: [{ reps: 8, weight: 185, completed: false }, { reps: 8, weight: 185, completed: false }, { reps: 8, weight: 185, completed: false }, { reps: 8, weight: 185, completed: false }],
        restSeconds: 120
      },
      {
        exerciseId: 'leg-press',
        exercise: exercises.find(e => e.id === 'leg-press')!,
        sets: [{ reps: 12, weight: 200, completed: false }, { reps: 12, weight: 200, completed: false }, { reps: 12, weight: 200, completed: false }],
        restSeconds: 90
      },
      {
        exerciseId: 'lunges',
        exercise: exercises.find(e => e.id === 'lunges')!,
        sets: [{ reps: 12, weight: 25, completed: false }, { reps: 12, weight: 25, completed: false }, { reps: 12, weight: 25, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'calf-raise',
        exercise: exercises.find(e => e.id === 'calf-raise')!,
        sets: [{ reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }],
        restSeconds: 45
      }
    ]
  },
  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn.',
    difficulty: 'intermediate',
    category: 'Cardio',
    estimatedDuration: 25,
    exercises: [
      {
        exerciseId: 'jumping-jacks',
        exercise: exercises.find(e => e.id === 'jumping-jacks')!,
        sets: [{ reps: 45, weight: 0, completed: false }, { reps: 45, weight: 0, completed: false }, { reps: 45, weight: 0, completed: false }],
        restSeconds: 15
      },
      {
        exerciseId: 'burpees',
        exercise: exercises.find(e => e.id === 'burpees')!,
        sets: [{ reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }, { reps: 15, weight: 0, completed: false }],
        restSeconds: 30
      },
      {
        exerciseId: 'push-up',
        exercise: exercises.find(e => e.id === 'push-up')!,
        sets: [{ reps: 20, weight: 0, completed: false }, { reps: 20, weight: 0, completed: false }, { reps: 20, weight: 0, completed: false }],
        restSeconds: 30
      },
      {
        exerciseId: 'lunges',
        exercise: exercises.find(e => e.id === 'lunges')!,
        sets: [{ reps: 20, weight: 0, completed: false }, { reps: 20, weight: 0, completed: false }, { reps: 20, weight: 0, completed: false }],
        restSeconds: 30
      }
    ]
  },
  {
    id: 'back-strength',
    name: 'Back Strength Builder',
    description: 'Develop a strong, muscular back with pulling movements.',
    difficulty: 'advanced',
    category: 'Strength',
    estimatedDuration: 40,
    exercises: [
      {
        exerciseId: 'deadlift',
        exercise: exercises.find(e => e.id === 'deadlift')!,
        sets: [{ reps: 5, weight: 225, completed: false }, { reps: 5, weight: 225, completed: false }, { reps: 5, weight: 225, completed: false }, { reps: 5, weight: 225, completed: false }],
        restSeconds: 180
      },
      {
        exerciseId: 'pull-up',
        exercise: exercises.find(e => e.id === 'pull-up')!,
        sets: [{ reps: 10, weight: 0, completed: false }, { reps: 10, weight: 0, completed: false }, { reps: 10, weight: 0, completed: false }],
        restSeconds: 90
      },
      {
        exerciseId: 'dumbbell-row',
        exercise: exercises.find(e => e.id === 'dumbbell-row')!,
        sets: [{ reps: 12, weight: 50, completed: false }, { reps: 12, weight: 50, completed: false }, { reps: 12, weight: 50, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'lat-pulldown',
        exercise: exercises.find(e => e.id === 'lat-pulldown')!,
        sets: [{ reps: 12, weight: 120, completed: false }, { reps: 12, weight: 120, completed: false }, { reps: 12, weight: 120, completed: false }],
        restSeconds: 60
      }
    ]
  },
  {
    id: 'beginner-fitness',
    name: 'Beginner Full Body',
    description: 'Perfect starting point for fitness newcomers.',
    difficulty: 'beginner',
    category: 'General',
    estimatedDuration: 30,
    exercises: [
      {
        exerciseId: 'push-up',
        exercise: exercises.find(e => e.id === 'push-up')!,
        sets: [{ reps: 10, weight: 0, completed: false }, { reps: 10, weight: 0, completed: false }, { reps: 10, weight: 0, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'lunges',
        exercise: exercises.find(e => e.id === 'lunges')!,
        sets: [{ reps: 10, weight: 0, completed: false }, { reps: 10, weight: 0, completed: false }, { reps: 10, weight: 0, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'dumbbell-row',
        exercise: exercises.find(e => e.id === 'dumbbell-row')!,
        sets: [{ reps: 12, weight: 20, completed: false }, { reps: 12, weight: 20, completed: false }, { reps: 12, weight: 20, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'shoulder-press',
        exercise: exercises.find(e => e.id === 'shoulder-press')!,
        sets: [{ reps: 10, weight: 15, completed: false }, { reps: 10, weight: 15, completed: false }, { reps: 10, weight: 15, completed: false }],
        restSeconds: 60
      },
      {
        exerciseId: 'plank',
        exercise: exercises.find(e => e.id === 'plank')!,
        sets: [{ reps: 30, weight: 0, completed: false }, { reps: 30, weight: 0, completed: false }, { reps: 30, weight: 0, completed: false }],
        restSeconds: 45
      }
    ]
  },
  {
    id: 'flexibility-flow',
    name: 'Flexibility & Recovery',
    description: 'Stretching and mobility work for recovery days.',
    difficulty: 'beginner',
    category: 'Flexibility',
    estimatedDuration: 20,
    exercises: [
      {
        exerciseId: 'yoga-flow',
        exercise: exercises.find(e => e.id === 'yoga-flow')!,
        sets: [{ reps: 60, weight: 0, completed: false }, { reps: 60, weight: 0, completed: false }],
        restSeconds: 30
      },
      {
        exerciseId: 'hamstring-stretch',
        exercise: exercises.find(e => e.id === 'hamstring-stretch')!,
        sets: [{ reps: 30, weight: 0, completed: false }, { reps: 30, weight: 0, completed: false }],
        restSeconds: 15
      },
      {
        exerciseId: 'plank',
        exercise: exercises.find(e => e.id === 'plank')!,
        sets: [{ reps: 45, weight: 0, completed: false }, { reps: 45, weight: 0, completed: false }],
        restSeconds: 30
      }
    ]
  }
];

export const defaultUserStats: UserStats = {
  totalWorkouts: 24,
  totalDuration: 1080,
  totalVolume: 45600,
  currentStreak: 5,
  longestStreak: 12,
  weeklyGoal: 4,
  weeklyCompleted: 3
};

export const sampleWorkoutLogs: WorkoutLog[] = [
  { id: '1', sessionId: 'full-body-strength', sessionName: 'Full Body Strength', date: new Date(Date.now() - 86400000), duration: 42, exercisesCompleted: 6, totalSets: 18, totalVolume: 8540 },
  { id: '2', sessionId: 'upper-body-power', sessionName: 'Upper Body Power', date: new Date(Date.now() - 172800000), duration: 38, exercisesCompleted: 6, totalSets: 20, totalVolume: 7200 },
  { id: '3', sessionId: 'hiit-cardio', sessionName: 'HIIT Cardio Blast', date: new Date(Date.now() - 259200000), duration: 25, exercisesCompleted: 4, totalSets: 12, totalVolume: 0 },
  { id: '4', sessionId: 'lower-body-focus', sessionName: 'Lower Body Focus', date: new Date(Date.now() - 345600000), duration: 35, exercisesCompleted: 4, totalSets: 14, totalVolume: 12800 },
  { id: '5', sessionId: 'full-body-strength', sessionName: 'Full Body Strength', date: new Date(Date.now() - 432000000), duration: 45, exercisesCompleted: 6, totalSets: 18, totalVolume: 8900 }
];
