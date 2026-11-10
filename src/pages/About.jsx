import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import PageHeader from '../components/PageHeader'

const PROBLEMS = [
  {
    icon: 'list',
    tone: 'sky',
    title: 'Scattered information',
    text: 'Workouts live in a notes app, meals in memory and steps in a third app. Nothing shows the whole day.',
  },
  {
    icon: 'target',
    tone: 'coral',
    title: 'Guesswork instead of numbers',
    text: 'Without totals it is hard to tell whether you ate enough to recover or trained enough to progress.',
  },
  {
    icon: 'clock',
    tone: 'amber',
    title: 'Tools that take too long',
    text: 'Big fitness apps ask for sign-ups, subscriptions and dozens of fields before you can log one meal.',
  },
]

const PRINCIPLES = [
  { title: 'Fast to log', text: 'Every form fits on one screen and takes a few seconds to fill in.' },
  { title: 'Clear to read', text: 'Four numbers and one chart tell you how today and this week are going.' },
  { title: 'Yours to keep', text: 'In this phase all data is saved in your own browser. Nothing is uploaded.' },
]

export default function About() {
  return (
    <>
      <title>About | HealthTrack</title>
      <PageHeader
        eyebrow="About"
        title="A simpler way to keep track of your health"
        lead="HealthTrack is a personal fitness and wellness tracker that brings activities, meals and workouts together in one daily view."
      />

      <section className="ht-section-tight" aria-labelledby="purpose-title">
        <Container>
          <Row className="gy-4 align-items-center">
            <Col lg={6}>
              <span className="ht-eyebrow">Purpose</span>
              <h2 id="purpose-title">Why this app exists</h2>
              <p>
                Staying healthy comes down to a few daily habits: moving, eating well and training
                consistently. The hard part is not doing them once, it is seeing whether you are
                keeping them up.
              </p>
              <p className="mb-0">
                HealthTrack gives you one place to record those habits and an honest summary of each
                day. You log what you did, and the app does the adding up: calories eaten, calories
                burned, minutes trained and how the last seven days compare.
              </p>
            </Col>
            <Col lg={{ span: 5, offset: 1 }}>
              <blockquote className="ht-quote mb-0">
                What gets measured gets managed. HealthTrack makes the measuring part quick enough
                that you will actually do it.
              </blockquote>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="ht-section-tight" aria-labelledby="problem-title">
        <Container>
          <span className="ht-eyebrow">The problem</span>
          <h2 id="problem-title" className="mb-4">
            What HealthTrack solves
          </h2>
          <Row className="g-4">
            {PROBLEMS.map((problem) => (
              <Col md={4} key={problem.title}>
                <FeatureCard {...problem} />
              </Col>
            ))}
          </Row>

          <Row className="g-4 mt-2">
            {PRINCIPLES.map((principle, index) => (
              <Col md={4} key={principle.title}>
                <div className="ht-step-number" aria-hidden="true">
                  0{index + 1}
                </div>
                <h3 className="h5 mt-2">{principle.title}</h3>
                <p className="text-muted mb-0">{principle.text}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="ht-section-tight pb-0" aria-labelledby="developer-title">
        <Container>
          <Card>
            <Card.Body className="p-4 p-md-5">
              <Row className="gy-4 align-items-center">
                <Col md="auto">
                  <div className="ht-avatar" aria-hidden="true">
                    MI
                  </div>
                </Col>
                <Col>
                  <span className="ht-eyebrow">About the developer</span>
                  <h2 id="developer-title" className="h3">
                    Maroun Issa
                  </h2>
                  <p>
                    I am a computer science student and I designed and built HealthTrack on my own
                    as the project for CSCI426 Advanced Web Programming. I wanted a tracker that
                    fits the way I train, with a push, pull, legs and skills split, without the
                    noise of a full fitness platform.
                  </p>
                  <p className="mb-3">
                    This first phase is the React frontend. The next phase adds a backend and a
                    database, so the same app will save your data to an account instead of the
                    browser.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className="ht-tag">React</span>
                    <span className="ht-tag tone-sky">React Router</span>
                    <span className="ht-tag tone-amber">Bootstrap 5</span>
                    <span className="ht-tag tone-coral">Vite</span>
                  </div>
                  <Button as={Link} to="/contact" variant="primary">
                    Get in touch
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </>
  )
}
