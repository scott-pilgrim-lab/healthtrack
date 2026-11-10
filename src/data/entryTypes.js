// Configuration for the three trackers. EntryForm and EntryList are generic:
// they read this config instead of having one hard-coded form per tracker.
// Adding a fourth tracker (e.g. sleep) would only need a new block here.

const dateField = { name: 'date', label: 'Date', type: 'date', required: true }

export const ENTRY_TYPES = {
  activities: {
    key: 'activities',
    label: 'Activities',
    singular: 'activity',
    icon: 'pulse',
    tone: 'coral',
    emptyText: 'Log a walk, a run or a swim to see it here.',
    fields: [
      {
        name: 'name',
        label: 'Activity',
        type: 'text',
        required: true,
        placeholder: 'e.g. Morning run',
      },
      dateField,
      { name: 'duration', label: 'Duration (min)', type: 'number', required: true, min: 1, half: true },
      { name: 'calories', label: 'Calories burned', type: 'number', required: true, min: 0, half: true },
    ],
    // Short facts shown under the entry title.
    describe: (entry) => [`${entry.duration} min`, `${entry.calories} kcal burned`],
  },

  meals: {
    key: 'meals',
    label: 'Meals',
    singular: 'meal',
    icon: 'meal',
    tone: 'amber',
    emptyText: 'Add what you ate to keep your calorie total honest.',
    fields: [
      {
        name: 'name',
        label: 'Meal',
        type: 'text',
        required: true,
        placeholder: 'e.g. Grilled chicken & tabbouleh',
      },
      {
        name: 'category',
        label: 'Type',
        type: 'select',
        required: true,
        options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        half: true,
      },
      { ...dateField, half: true },
      { name: 'calories', label: 'Calories', type: 'number', required: true, min: 0, half: true },
      { name: 'protein', label: 'Protein (g)', type: 'number', required: false, min: 0, half: true },
    ],
    describe: (entry) =>
      [`${entry.calories} kcal`, entry.protein ? `${entry.protein} g protein` : null].filter(Boolean),
  },

  workouts: {
    key: 'workouts',
    label: 'Workouts',
    singular: 'workout',
    icon: 'dumbbell',
    tone: 'forest',
    emptyText: 'Record a session and its exercises to track your split.',
    fields: [
      {
        name: 'name',
        label: 'Workout',
        type: 'text',
        required: true,
        placeholder: 'e.g. Push day',
      },
      {
        name: 'category',
        label: 'Focus',
        type: 'select',
        required: true,
        options: ['Push', 'Pull', 'Legs', 'Skills', 'Full body'],
        half: true,
      },
      { ...dateField, half: true },
      { name: 'duration', label: 'Duration (min)', type: 'number', required: true, min: 1, half: true },
      { name: 'calories', label: 'Calories burned', type: 'number', required: true, min: 0, half: true },
      {
        name: 'notes',
        label: 'Exercises',
        type: 'textarea',
        required: false,
        placeholder: 'e.g. Push-ups 4x15, Dips 4x10',
      },
    ],
    describe: (entry) => [`${entry.duration} min`, `${entry.calories} kcal burned`],
  },
}

// Order used for the dashboard tabs.
export const ENTRY_TYPE_KEYS = ['activities', 'meals', 'workouts']

// Daily targets used by the progress bars on the dashboard.
export const DAILY_GOALS = {
  caloriesEaten: 2400,
  caloriesBurned: 600,
  workoutMinutes: 60,
}
