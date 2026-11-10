import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import Icon from '../components/Icon'

const HIGHLIGHTS = [
  {
    icon: 'pulse',
    tone: 'coral',
    title: 'Track every move',
    text: 'Runs, walks, swims or a football match. Log the minutes and the calories you burned in seconds.',
  },
  {
    icon: 'meal',
    tone: 'amber',
    title: 'Know what you eat',
    text: 'Add each meal with its calories and protein and watch your daily total add up as you go.',
  },
  {
    icon: 'dumbbell',
    title: 'Own your workouts',
    text: 'Record every session of your split, with the exercises you did, and see your training week take shape.',
  },
]

const STEPS = [
  { title: 'Log it', text: 'Add an activity, a meal or a workout with one short form.' },
  { title: 'See today', text: 'Summary cards total your calories, minutes and entries for the day.' },
  { title: 'Spot the trend', text: 'A 7-day view shows how your eating and training balance out.' },
]

// Circumference of the hero ring (2 * PI * r, r = 52), used to draw progress.
const RING_LENGTH = 327

export default function Home() {
  return (
    <>
      <title>HealthTrack | Personal fitness and wellness tracker</title>

      <section className="ht-hero ht-dark">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={7} className="ht-rise">
              <span className="ht-eyebrow">Fitness &amp; wellness tracker</span>
              <h1 className="mb-3">
                Every rep, meal and mile. <em>One clear daily view.</em>
              </h1>
              <p className="lead mb-4" style={{ maxWidth: '34rem' }}>
                HealthTrack keeps your activities, meals and workouts in one place and turns them
                into a simple summary of your day, so you always know where you stand.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/dashboard" variant="accent" size="lg">
                  Open your dashboard <Icon name="arrow" size={18} className="ms-1" />
                </Button>
                <Button as={Link} to="/features" variant="outline-light" size="lg">
                  See the features
                </Button>
              </div>
              <ul className="ht-hero-points">
                <li>
                  <Icon name="check" size={16} /> No account needed
                </li>
                <li>
                  <Icon name="check" size={16} /> Works on phone and desktop
                </li>
                <li>
                  <Icon name="check" size={16} /> Your data stays on your device
                </li>
              </ul>
            </Col>

            {/* Decorative preview of a day; hidden from screen readers. */}
            <Col lg={5} className="ht-rise ht-rise-2" aria-hidden="true">
              <div className="ht-preview">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
                    <circle
                      className="ht-preview-ring ring-progress"
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#c8f03c"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={RING_LENGTH}
                      strokeDashoffset={RING_LENGTH * (1 - 0.72)}
                    />
                    <text x="60" y="58" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
                      72%
                    </text>
                    <text x="60" y="76" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                      of daily goal
                    </text>
                  </svg>
                  <div>
                    <div className="ht-display fs-4">Today</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)' }}>Pull day, done.</div>
                  </div>
                </div>
                <div className="ht-preview-row">
                  <span>Calories eaten</span>
                  <strong>1,940 kcal</strong>
                </div>
                <div className="ht-preview-row">
                  <span>Calories burned</span>
                  <strong>520 kcal</strong>
                </div>
                <div className="ht-preview-row">
                  <span>Workout time</span>
                  <strong>50 min</strong>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="ht-section" aria-labelledby="highlights-title">
        <Container>
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '40rem' }}>
            <span className="ht-eyebrow">Why HealthTrack</span>
            <h2 id="highlights-title">Three trackers, zero clutter</h2>
            <p className="lead mb-0">
              Most fitness apps do too much. HealthTrack does three things well and shows you the
              result on a single screen.
            </p>
          </div>
          <Row className="g-4">
            {HIGHLIGHTS.map((item) => (
              <Col md={4} key={item.title}>
                <FeatureCard {...item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ht-section-tight" aria-labelledby="steps-title">
        <Container>
          <Row className="gy-4 align-items-start">
            <Col lg={4}>
              <span className="ht-eyebrow">How it works</span>
              <h2 id="steps-title" className="mb-0">
                From first entry to weekly trend in three steps
              </h2>
            </Col>
            <Col lg={8}>
              <Row as="ol" className="g-4 list-unstyled mb-0">
                {STEPS.map((step, index) => (
                  <Col as="li" sm={4} key={step.title}>
                    <div className="ht-step-number" aria-hidden="true">
                      0{index + 1}
                    </div>
                    <h3 className="h5 mt-2">{step.title}</h3>
                    <p className="text-muted mb-0">{step.text}</p>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="ht-section-tight pb-0">
        <Container>
          <div className="ht-cta ht-dark text-center">
            <h2 className="mb-2">Ready to see your day?</h2>
            <p className="mb-4 mx-auto" style={{ maxWidth: '32rem' }}>
              The dashboard comes loaded with a sample training week, so you can explore it straight
              away and then make it yours.
            </p>
            <Button as={Link} to="/dashboard" variant="accent" size="lg">
              Go to the dashboard <Icon name="arrow" size={18} className="ms-1" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
