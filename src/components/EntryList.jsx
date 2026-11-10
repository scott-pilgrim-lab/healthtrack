import Icon from './Icon'
import { formatDate } from '../utils/date'

/**
 * Renders entries of one tracker. How an entry is described comes from
 * `config.describe`, so the list works for activities, meals and workouts.
 *
 * Props:
 *  - entries: array to show (already filtered by the parent)
 *  - config: one of the ENTRY_TYPES blocks
 *  - onDelete(id): called when the delete button of an entry is pressed
 */
export default function EntryList({ entries, config, onDelete }) {
  const chipTone = config.tone === 'forest' ? '' : `tone-${config.tone}`

  return (
    <ul className="ht-entry-list">
      {entries.map((entry) => (
        <li className="ht-entry" key={entry.id}>
          <span className={`ht-chip ${chipTone} d-none d-sm-inline-flex`}>
            <Icon name={config.icon} />
          </span>

          <div className="ht-entry-body">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <h3 className="ht-entry-title">{entry.name}</h3>
              {entry.category && <span className={`ht-tag ${chipTone}`}>{entry.category}</span>}
            </div>
            <p className="ht-entry-meta">
              <span>
                <Icon name="calendar" size={14} className="me-1" />
                {formatDate(entry.date)}
              </span>
              {config.describe(entry).map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </p>
            {entry.notes && <p className="ht-entry-notes">{entry.notes}</p>}
          </div>

          <button
            type="button"
            className="ht-delete-btn"
            onClick={() => onDelete(entry.id)}
            aria-label={`Delete ${entry.name} (${formatDate(entry.date)})`}
            title="Delete"
          >
            <Icon name="trash" size={18} />
          </button>
        </li>
      ))}
    </ul>
  )
}
