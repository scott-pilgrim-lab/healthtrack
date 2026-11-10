// Pure functions that turn the raw entries into the numbers the dashboard shows.
// They take data in and return data out, so they are easy to test and reuse.
import { lastNDays } from './date'

const sum = (entries, field) =>
  entries.reduce((total, entry) => total + (Number(entry[field]) || 0), 0)

const onDate = (entries, date) => entries.filter((entry) => entry.date === date)

/**
 * Totals for one day.
 * `data` is { activities: [], meals: [], workouts: [] }.
 */
export function getDailyTotals(data, date) {
  const activities = onDate(data.activities, date)
  const meals = onDate(data.meals, date)
  const workouts = onDate(data.workouts, date)

  return {
    date,
    caloriesEaten: sum(meals, 'calories'),
    // Both activities and workouts burn calories.
    caloriesBurned: sum(activities, 'calories') + sum(workouts, 'calories'),
    workoutMinutes: sum(workouts, 'duration'),
    entriesLogged: activities.length + meals.length + workouts.length,
  }
}

/** Daily totals for the last 7 days, oldest first. */
export function getWeekSeries(data) {
  return lastNDays(7).map((date) => getDailyTotals(data, date))
}

/** Percentage of a goal reached, capped at 100 for progress bars. */
export function toPercent(value, goal) {
  if (!goal) return 0
  return Math.min(100, Math.round((value / goal) * 100))
}

export const formatNumber = (value) => Number(value).toLocaleString('en-US')
