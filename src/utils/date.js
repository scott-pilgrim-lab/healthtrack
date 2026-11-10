// Date helpers. Every entry stores its date as a local "YYYY-MM-DD" string,
// which is what <input type="date"> produces and what a SQL DATE column expects.

/** Format a Date as local YYYY-MM-DD (toISOString would shift it to UTC). */
export function toDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Date key for "today minus n days". */
export function daysAgo(n) {
  const date = new Date()
  date.setDate(date.getDate() - n)
  return toDateKey(date)
}

/** Parse a YYYY-MM-DD key as a local date (new Date(key) would parse as UTC). */
export function parseDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** The last n date keys, oldest first, ending today. */
export function lastNDays(n) {
  return Array.from({ length: n }, (_, i) => daysAgo(n - 1 - i))
}

/** "Today", "Yesterday" or e.g. "Tue, 10 Nov". */
export function formatDate(key) {
  if (key === toDateKey()) return 'Today'
  if (key === daysAgo(1)) return 'Yesterday'
  return parseDateKey(key).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

/** Short weekday name, e.g. "Mon". */
export function formatWeekday(key) {
  return parseDateKey(key).toLocaleDateString('en-GB', { weekday: 'short' })
}

/** e.g. "Tuesday, 10 November 2026" */
export function formatLongDate(key) {
  return parseDateKey(key).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
