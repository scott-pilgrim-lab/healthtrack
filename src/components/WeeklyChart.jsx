import { formatDate, formatWeekday, toDateKey } from '../utils/date'
import { formatNumber } from '../utils/stats'

// Round the tallest value up to a tidy axis maximum (e.g. 2,310 -> 2,500).
const niceMax = (value) => Math.max(500, Math.ceil(value / 500) * 500)

/**
 * 7-day bar chart built only with divs and CSS (no chart library).
 * Each day gets two bars whose height is a percentage of the axis maximum.
 *
 * Props:
 *  - series: array of 7 daily totals from getWeekSeries(), oldest first
 */
export default function WeeklyChart({ series }) {
  const today = toDateKey()
  const max = niceMax(Math.max(...series.map((day) => Math.max(day.caloriesEaten, day.caloriesBurned))))
  const height = (value) => `${(value / max) * 100}%`

  return (
    <figure className="mb-0">
      <div className="ht-legend mb-3">
        <span>
          <span className="ht-legend-dot is-eaten" />
          Calories eaten
        </span>
        <span>
          <span className="ht-legend-dot is-burned" />
          Calories burned
        </span>
      </div>

      {/* The bars are visual only; the table below gives the same data to
          screen readers. */}
      <div aria-hidden="true">
        <div className="ht-chart">
          <div className="ht-chart-grid" style={{ top: 0 }}>
            <span>{formatNumber(max)}</span>
          </div>
          <div className="ht-chart-grid" style={{ top: '50%' }}>
            <span>{formatNumber(max / 2)}</span>
          </div>

          {series.map((day, index) => (
            <div
              className="ht-chart-day"
              key={day.date}
              title={`${formatDate(day.date)}: ${formatNumber(day.caloriesEaten)} kcal eaten, ${formatNumber(day.caloriesBurned)} kcal burned`}
            >
              {/* Stagger the grow animation from left to right. */}
              <div
                className="ht-chart-bar is-eaten"
                style={{ height: height(day.caloriesEaten), animationDelay: `${index * 50}ms` }}
              />
              <div
                className="ht-chart-bar is-burned"
                style={{ height: height(day.caloriesBurned), animationDelay: `${index * 50 + 80}ms` }}
              />
            </div>
          ))}
        </div>

        <div className="ht-chart-labels">
          {series.map((day) => (
            <div key={day.date} className={day.date === today ? 'is-today' : ''}>
              <strong>{formatWeekday(day.date)}</strong>
              <span>{day.workoutMinutes > 0 ? `${day.workoutMinutes} min` : 'rest'}</span>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="small text-muted mt-3">
        Bars show calories in kcal. The line under each day is workout time.
      </figcaption>

      <table className="visually-hidden">
        <caption>Calories and workout minutes for the last 7 days</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Calories eaten</th>
            <th scope="col">Calories burned</th>
            <th scope="col">Workout minutes</th>
          </tr>
        </thead>
        <tbody>
          {series.map((day) => (
            <tr key={day.date}>
              <th scope="row">{formatDate(day.date)}</th>
              <td>{day.caloriesEaten}</td>
              <td>{day.caloriesBurned}</td>
              <td>{day.workoutMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
