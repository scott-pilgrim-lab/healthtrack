import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import GoalProgress from '../components/GoalProgress'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import TrackerPanel from '../components/TrackerPanel'
import WeeklyChart from '../components/WeeklyChart'
import { ENTRY_TYPES, ENTRY_TYPE_KEYS } from '../data/entryTypes'
import { addEntry, deleteEntry, getEntries, resetToSampleData } from '../services/storage'
import { formatLongDate, toDateKey } from '../utils/date'
import { getDailyTotals, getWeekSeries } from '../utils/stats'

const EMPTY_DATA = { activities: [], meals: [], workouts: [] }

// Load the three lists together and return them as one object.
async function loadAll() {
  const lists = await Promise.all(ENTRY_TYPE_KEYS.map((type) => getEntries(type)))
  return Object.fromEntries(ENTRY_TYPE_KEYS.map((type, index) => [type, lists[index]]))
}

export default function Dashboard() {
  // All entries live here, in one place. The summary cards, the chart and the
  // lists are all calculated from this state, so they can never disagree.
  const [data, setData] = useState(EMPTY_DATA)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('activities')

  useEffect(() => {
    let ignore = false // avoids setting state if the page was left meanwhile
    loadAll()
      .then((loaded) => {
        if (!ignore) setData(loaded)
      })
      .catch(() => {
        if (!ignore) setError('Your entries could not be loaded. Please refresh the page.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  // Save through the storage service first, then mirror the change in state.
  const handleAdd = async (type, entry) => {
    try {
      const created = await addEntry(type, entry)
      setData((prev) => ({
        ...prev,
        // Keep the list sorted newest date first.
        [type]: [created, ...prev[type]].sort((a, b) => b.date.localeCompare(a.date)),
      }))
      setError('')
    } catch {
      setError('That entry could not be saved. Please try again.')
    }
  }

  const handleDelete = async (type, id) => {
    try {
      await deleteEntry(type, id)
      setData((prev) => ({ ...prev, [type]: prev[type].filter((entry) => entry.id !== id) }))
      setError('')
    } catch {
      setError('That entry could not be deleted. Please try again.')
    }
  }

  const handleReset = async () => {
    if (!window.confirm('Replace all your entries with the sample data?')) return
    await resetToSampleData()
    setData(await loadAll())
  }

  // Derived values: recalculated from `data` on every render.
  const today = toDateKey()
  const totals = getDailyTotals(data, today)
  const week = getWeekSeries(data)
  const net = totals.caloriesEaten - totals.caloriesBurned

  return (
    <>
      <title>Dashboard | HealthTrack</title>
      <PageHeader eyebrow={formatLongDate(today)} title="Your dashboard" lead="Today at a glance, plus everything you have logged.">
        <Button variant="outline-light" size="sm" onClick={handleReset}>
          Reset sample data
        </Button>
      </PageHeader>

      <Container className="py-4 py-md-5">
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <section aria-labelledby="summary-title" className="mb-4">
          <h2 id="summary-title" className="visually-hidden">
            Today&apos;s summary
          </h2>
          <Row className="g-3 g-lg-4">
            <Col xs={6} xl={3}>
              <StatCard icon="meal" tone="amber" label="Calories eaten" value={totals.caloriesEaten} unit="kcal" hint="today" />
            </Col>
            <Col xs={6} xl={3}>
              <StatCard icon="flame" tone="coral" label="Calories burned" value={totals.caloriesBurned} unit="kcal" hint="today" />
            </Col>
            <Col xs={6} xl={3}>
              <StatCard icon="clock" label="Workout minutes" value={totals.workoutMinutes} unit="min" hint="today" />
            </Col>
            <Col xs={6} xl={3}>
              <StatCard icon="list" tone="sky" label="Entries logged" value={totals.entriesLogged} hint="today" />
            </Col>
          </Row>
        </section>

        <Row className="g-3 g-lg-4 mb-5">
          <Col lg={7}>
            <Card className="h-100">
              <Card.Body>
                <h2 className="h4 mb-1">Last 7 days</h2>
                <p className="text-muted small mb-3">How your eating and training compare day by day.</p>
                <WeeklyChart series={week} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5}>
            <Card className="h-100">
              <Card.Body>
                <h2 className="h4 mb-1">Today&apos;s goals</h2>
                <p className="text-muted small mb-4">
                  Net intake so far: <strong className="text-body">{net.toLocaleString('en-US')} kcal</strong>
                </p>
                <GoalProgress totals={totals} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section aria-labelledby="log-title">
          <h2 id="log-title" className="mb-3">
            Your log
          </h2>

          {loading ? (
            <p className="text-muted" role="status">
              Loading your entries...
            </p>
          ) : (
            <Tabs
              id="tracker-tabs"
              variant="pills"
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key)}
              className="ht-tabs mb-4"
            >
              {ENTRY_TYPE_KEYS.map((type) => (
                <Tab
                  key={type}
                  eventKey={type}
                  title={
                    <>
                      {ENTRY_TYPES[type].label}
                      <span className="ht-tab-count d-none d-sm-inline-block">{data[type].length}</span>
                    </>
                  }
                >
                  <TrackerPanel
                    config={ENTRY_TYPES[type]}
                    entries={data[type]}
                    onAdd={(entry) => handleAdd(type, entry)}
                    onDelete={(id) => handleDelete(type, id)}
                  />
                </Tab>
              ))}
            </Tabs>
          )}
        </section>
      </Container>
    </>
  )
}
