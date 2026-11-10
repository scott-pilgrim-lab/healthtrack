import { ProgressBar } from 'react-bootstrap'
import { DAILY_GOALS } from '../data/entryTypes'
import { formatNumber, toPercent } from '../utils/stats'

const GOALS = [
  { key: 'caloriesEaten', label: 'Calories eaten', unit: 'kcal', tone: 'amber' },
  { key: 'caloriesBurned', label: 'Calories burned', unit: 'kcal', tone: 'coral' },
  { key: 'workoutMinutes', label: 'Workout time', unit: 'min', tone: '' },
]

// Progress bars comparing today's totals with the daily goals.
export default function GoalProgress({ totals }) {
  return (
    <div>
      {GOALS.map((goal) => {
        const value = totals[goal.key]
        const target = DAILY_GOALS[goal.key]
        const percent = toPercent(value, target)

        return (
          <div className="ht-goal" key={goal.key}>
            <div className="ht-goal-head">
              <strong>{goal.label}</strong>
              <span className="text-muted">
                {formatNumber(value)} / {formatNumber(target)} {goal.unit}
              </span>
            </div>
            <ProgressBar
              now={percent}
              className={goal.tone ? `tone-${goal.tone}` : ''}
              aria-label={`${goal.label}: ${percent}% of daily goal`}
            />
          </div>
        )
      })}
    </div>
  )
}
