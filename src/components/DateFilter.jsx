import { Button, Form } from 'react-bootstrap'
import { toDateKey } from '../utils/date'

/**
 * Date filter for a list. An empty string means "all dates".
 * It is a controlled component: the parent owns the value.
 */
export default function DateFilter({ id, value, onChange }) {
  const today = toDateKey()

  return (
    <div className="d-flex flex-wrap align-items-end gap-2">
      <Form.Group controlId={id}>
        <Form.Label>Filter by date</Form.Label>
        <Form.Control
          type="date"
          value={value}
          max={today}
          onChange={(event) => onChange(event.target.value)}
        />
      </Form.Group>
      <Button
        variant={value === today ? 'primary' : 'outline-primary'}
        onClick={() => onChange(today)}
        aria-pressed={value === today}
      >
        Today
      </Button>
      <Button
        variant={value === '' ? 'primary' : 'outline-primary'}
        onClick={() => onChange('')}
        aria-pressed={value === ''}
      >
        All dates
      </Button>
    </div>
  )
}
