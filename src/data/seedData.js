// Sample data loaded the first time the app runs, so the dashboard is not empty.
// `daysAgo` is converted to a real date when seeding, which keeps the sample
// week ending "today" no matter when the app is first opened.
import { daysAgo } from '../utils/date'

// Calisthenics push / pull / legs + skills split.
const workouts = [
  {
    daysAgo: 0,
    name: 'Leg day',
    category: 'Legs',
    duration: 45,
    calories: 340,
    notes: 'Pistol squat progressions 4x6, Bulgarian split squats 4x10, Nordic curl negatives 3x5, Calf raises 4x20',
  },
  {
    daysAgo: 1,
    name: 'Pull day',
    category: 'Pull',
    duration: 50,
    calories: 360,
    notes: 'Pull-ups 5x8, Australian rows 4x12, Chin-ups 3x8, Hanging knee raises 3x15',
  },
  {
    daysAgo: 2,
    name: 'Push day',
    category: 'Push',
    duration: 55,
    calories: 380,
    notes: 'Push-ups 4x15, Pike push-ups 4x8, Parallel bar dips 4x10, Diamond push-ups 3x12',
  },
  {
    daysAgo: 3,
    name: 'Skills session',
    category: 'Skills',
    duration: 40,
    calories: 220,
    notes: 'Wall handstand holds 6x30s, L-sit 5x15s, Tuck planche 5x10s, Tuck front lever 4x10s',
  },
  {
    daysAgo: 4,
    name: 'Leg day',
    category: 'Legs',
    duration: 45,
    calories: 330,
    notes: 'Jump squats 4x12, Walking lunges 4x16, Single-leg glute bridges 3x12, Wall sit 3x45s',
  },
  {
    daysAgo: 5,
    name: 'Pull day',
    category: 'Pull',
    duration: 50,
    calories: 350,
    notes: 'Weighted pull-ups 4x5, Archer rows 4x8, Negative muscle-ups 4x3, Dead hangs 3x40s',
  },
  {
    daysAgo: 6,
    name: 'Push day',
    category: 'Push',
    duration: 60,
    calories: 400,
    notes: 'Decline push-ups 4x12, Wall handstand push-ups 4x5, Ring dips 4x8, Pseudo planche push-ups 3x8',
  },
]

const activities = [
  { daysAgo: 0, name: 'Morning run', duration: 30, calories: 310 },
  { daysAgo: 1, name: 'Evening walk', duration: 40, calories: 160 },
  { daysAgo: 2, name: 'Cycling to campus', duration: 25, calories: 210 },
  { daysAgo: 3, name: 'Swimming laps', duration: 35, calories: 320 },
  { daysAgo: 4, name: 'Mobility & stretching', duration: 20, calories: 70 },
  { daysAgo: 5, name: 'Five-a-side football', duration: 60, calories: 480 },
  { daysAgo: 6, name: 'Hike', duration: 90, calories: 520 },
]

const meals = [
  { daysAgo: 0, name: 'Oats with banana & peanut butter', category: 'Breakfast', calories: 520, protein: 22 },
  { daysAgo: 0, name: 'Grilled chicken with tabbouleh', category: 'Lunch', calories: 680, protein: 52 },
  { daysAgo: 0, name: 'Greek yogurt & almonds', category: 'Snack', calories: 240, protein: 18 },
  { daysAgo: 1, name: "Labneh & za'atar wrap", category: 'Breakfast', calories: 430, protein: 17 },
  { daysAgo: 1, name: 'Beef kafta with rice', category: 'Lunch', calories: 820, protein: 46 },
  { daysAgo: 1, name: 'Lentil soup with bread', category: 'Dinner', calories: 510, protein: 24 },
  { daysAgo: 1, name: 'Protein shake', category: 'Snack', calories: 180, protein: 30 },
  { daysAgo: 2, name: 'Scrambled eggs on toast', category: 'Breakfast', calories: 460, protein: 27 },
  { daysAgo: 2, name: 'Chicken shawarma bowl', category: 'Lunch', calories: 780, protein: 48 },
  { daysAgo: 2, name: 'Salmon with roasted vegetables', category: 'Dinner', calories: 640, protein: 42 },
  { daysAgo: 3, name: 'Fruit smoothie', category: 'Breakfast', calories: 350, protein: 12 },
  { daysAgo: 3, name: 'Tuna pasta salad', category: 'Lunch', calories: 690, protein: 38 },
  { daysAgo: 3, name: 'Fattoush with grilled halloumi', category: 'Dinner', calories: 560, protein: 26 },
  { daysAgo: 4, name: 'Oats with dates & walnuts', category: 'Breakfast', calories: 490, protein: 14 },
  { daysAgo: 4, name: 'Mujaddara with yogurt', category: 'Lunch', calories: 720, protein: 28 },
  { daysAgo: 4, name: 'Chicken stir-fry', category: 'Dinner', calories: 610, protein: 45 },
  { daysAgo: 4, name: 'Apple & peanut butter', category: 'Snack', calories: 260, protein: 7 },
  { daysAgo: 5, name: 'Manakish with cheese', category: 'Breakfast', calories: 540, protein: 19 },
  { daysAgo: 5, name: 'Turkey sandwich', category: 'Lunch', calories: 590, protein: 34 },
  { daysAgo: 5, name: 'Steak with sweet potato', category: 'Dinner', calories: 860, protein: 58 },
  { daysAgo: 6, name: 'Shakshuka', category: 'Breakfast', calories: 480, protein: 24 },
  { daysAgo: 6, name: 'Falafel plate with hummus', category: 'Lunch', calories: 750, protein: 26 },
  { daysAgo: 6, name: 'Grilled fish with rice', category: 'Dinner', calories: 700, protein: 44 },
  { daysAgo: 6, name: 'Trail mix', category: 'Snack', calories: 300, protein: 9 },
]

// Swap the relative `daysAgo` for a real date and give each entry a stable id.
const toEntries = (items, prefix) =>
  items.map(({ daysAgo: offset, ...rest }, index) => ({
    id: `seed-${prefix}-${index + 1}`,
    date: daysAgo(offset),
    ...rest,
  }))

export function buildSeedData() {
  return {
    activities: toEntries(activities, 'activity'),
    meals: toEntries(meals, 'meal'),
    workouts: toEntries(workouts, 'workout'),
  }
}
