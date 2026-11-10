import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'

const TRACKERS = [
  {
    icon: 'pulse',
    tone: 'coral',
    title: 'Activities',
    text: 'Everyday movement outside the gym: running, walking, cycling, swimming or sport.',
    points: ['Name, date and duration', 'Calories burned per activity', 'Filter the list by date'],
  },
  {
    icon: 'meal',
    tone: 'amber',
    title: 'Meals',
    text: 'A quick food log that keeps a running total of what you have eaten today.',
    points: ['Breakfast, lunch, dinner or snack', 'Calories and optional protein', 'Delete an entry in one tap'],
  },
  {
    icon: 'dumbbell',
    title: 'Workouts',
    text: 'Your training sessions, organised by focus so you can follow a split such as push, pull, legs and skills.',
    points: ['Focus tag for each session', 'Duration and calories burned', 'Notes for exercises, sets and reps'],
  },
]

const SUMMARY_ITEMS = [
  { icon: 'meal', tone: 'amber', title: 'Calories eaten', text: 'The total of every meal logged today.' },
  { icon: 'flame', tone: 'coral', title: 'Calories burned', text: 'Activities and workouts added together.' },
  { icon: 'clock', tone: '', title: 'Workout minutes', text: 'How long you trained today.' },
  { icon: 'list', tone: 'sky', title: 'Entries logged', text: 'How many things you recorded today.' },
]

const EXTRAS = [
  {
    icon: 'chart',
    tone: 'ink',
    title: '7-day progress',
    text: 'A bar chart compares calories eaten and burned for each of the last seven days, with your workout minutes underneath.',
  },
  {
    icon: 'target',
    tone: 'ink',
    title: 'Daily goals',
    text: 'Progress bars show how close you are to your calorie and training targets for the day.',
  },
  {
    icon: 'phone',
    tone: 'ink',
    title: 'Works on any screen',
    text: 'The layout adapts from a single column on a phone to a full grid on a desktop.',
  },
  {
    icon: 'database',
    tone: 'ink',
    title: 'Saved automatically',
    text: 'Entries are stored in your browser, so they are still there when you come back.',
  },
]

export default function Features() {
  return (
    <>
      <title>Features | HealthTrack</title>
      <PageHeader
        eyebrow="Features"
        title="Three trackers and a daily summary"
        lead="Everything in HealthTrack is built around one idea: log it quickly, then see what it adds up to."
      />

      <section className="ht-section-tight" aria-labelledby="trackers-title">
        <Container>
          <span className="ht-eyebrow">The trackers</span>
          <h2 id="trackers-title" className="mb-4">
            Log the three things that matter
          </h2>
          <Row className="g-4">
            {TRACKERS.map((tracker) => (
              <Col md={6} lg={4} key={tracker.title}>
                <FeatureCard {...tracker} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ht-section-tight" aria-labelledby="summary-title">
        <Container>
          <Card>
            <Card.Body className="p-4 p-lg-5">
              <Row className="gy-4 align-items-center">
                <Col lg={5}>
                  <span className="ht-eyebrow">Daily summary</span>
                  <h2 id="summary-title">Your day in four numbers</h2>
                  <p className="text-muted mb-0">
                    The top of the dashboard always shows today. The cards update the moment you add
                    or delete an entry, so there is nothing to refresh and nothing to calculate.
                  </p>
                </Col>
                <Col lg={7}>
                  <Row as="ul" className="g-3 list-unstyled mb-0">
                    {SUMMARY_ITEMS.map((item) => (
                      <Col as="li" sm={6} key={item.title}>
                        <div className="d-flex gap-3 align-items-start">
                          <span className={`ht-chip ${item.tone ? `tone-${item.tone}` : ''}`}>
                            <Icon name={item.icon} />
                          </span>
                          <div>
                            <h3 className="h6 mb-1">{item.title}</h3>
                            <p className="text-muted small mb-0">{item.text}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>

      <section className="ht-section-tight" aria-labelledby="extras-title">
        <Container>
          <span className="ht-eyebrow">And more</span>
          <h2 id="extras-title" className="mb-4">
            Built to be used every day
          </h2>
          <Row className="g-4">
            {EXTRAS.map((extra) => (
              <Col sm={6} lg={3} key={extra.title}>
                <FeatureCard {...extra} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ht-section-tight pb-0">
        <Container>
          <div className="ht-cta ht-dark d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
            <div>
              <h2 className="mb-2">Try it with the sample week</h2>
              <p className="mb-0">A full training week is already loaded in the dashboard.</p>
            </div>
            <Button as={Link} to="/dashboard" variant="accent" size="lg" className="flex-shrink-0 align-self-start align-self-md-center">
              Open the dashboard <Icon name="arrow" size={18} className="ms-1" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
