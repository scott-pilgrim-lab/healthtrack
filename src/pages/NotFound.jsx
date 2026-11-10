import { Button, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

// Shown by the catch-all "*" route for any URL that does not match a page.
export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <>
      <title>Page not found | HealthTrack</title>
      <section className="ht-section text-center">
        <Container>
          <p className="ht-404-code mb-2" aria-hidden="true">
            404
          </p>
          <h1 className="h2">This page skipped leg day</h1>
          <p className="lead mx-auto mb-4" style={{ maxWidth: '32rem' }}>
            We could not find <code>{pathname}</code>. It may have been moved, or the address might
            be mistyped.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Button as={Link} to="/" variant="primary" size="lg">
              Back to home
            </Button>
            <Button as={Link} to="/dashboard" variant="outline-primary" size="lg">
              Open the dashboard
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
