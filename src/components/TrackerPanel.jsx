import { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import DateFilter from './DateFilter'
import EmptyState from './EmptyState'
import EntryForm from './EntryForm'
import EntryList from './EntryList'
import { formatDate } from '../utils/date'

const PAGE_SIZE = 8

// 'Today' -> 'today' inside a sentence, but keep 'Wed 1 Jan' capitalised.
const dateInSentence = (key) => {
  const label = formatDate(key)
  return label === 'Today' || label === 'Yesterday' ? label.toLowerCase() : label
}

/**
 * Content of one dashboard tab: add form on the left, filter + list on the
 * right (stacked on small screens). The filter state lives here because it
 * only affects this panel; the entries themselves are owned by the Dashboard.
 */
export default function TrackerPanel({ config, entries, onAdd, onDelete }) {
  const [filterDate, setFilterDate] = useState('') // '' = all dates
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = filterDate ? entries.filter((entry) => entry.date === filterDate) : entries
  const visible = filtered.slice(0, visibleCount)

  const changeFilter = (date) => {
    setFilterDate(date)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <Row className="g-4">
      <Col lg={4}>
        <Card>
          <Card.Body>
            <h2 className="h4 mb-3">Add {config.singular}</h2>
            <EntryForm config={config} onAdd={onAdd} />
          </Card.Body>
        </Card>
      </Col>

      <Col lg={8}>
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
          <DateFilter id={`${config.key}-filter`} value={filterDate} onChange={changeFilter} />
          <p className="small text-muted mb-2" aria-live="polite">
            Showing {visible.length} of {filtered.length}{' '}
            {filterDate ? `for ${dateInSentence(filterDate)}` : 'in total'}
          </p>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={config.icon}
            title={`No ${config.label.toLowerCase()} yet`}
            text={config.emptyText}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="calendar"
            title="Nothing on this date"
            text={`There are no ${config.label.toLowerCase()} logged for ${dateInSentence(filterDate)}.`}
          >
            <Button variant="outline-primary" size="sm" onClick={() => changeFilter('')}>
              Show all dates
            </Button>
          </EmptyState>
        ) : (
          <>
            <EntryList entries={visible} config={config} onDelete={onDelete} />
            {filtered.length > visible.length && (
              <div className="text-center mt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  Show more ({filtered.length - visible.length} left)
                </Button>
              </div>
            )}
          </>
        )}
      </Col>
    </Row>
  )
}
