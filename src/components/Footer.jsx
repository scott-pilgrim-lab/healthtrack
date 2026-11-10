import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Brand from './Brand'
import { NAV_LINKS } from '../data/navLinks'

export default function Footer() {
  return (
    <footer className="ht-footer ht-dark">
      <Container>
        <Row className="gy-4">
          <Col md={6} lg={5}>
            <Brand />
            <p className="mt-3 mb-0" style={{ maxWidth: '26rem' }}>
              A personal fitness and wellness tracker for your activities, meals and workouts, all
              in one simple daily view.
            </p>
          </Col>
          <Col xs={6} md={3} lg={{ span: 3, offset: 1 }}>
            <h2>Explore</h2>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h2>Project</h2>
            <ul>
              <li>CSCI426 Advanced Web Programming</li>
              <li>Phase 1: React frontend</li>
              <li>Built by Maroun Issa</li>
            </ul>
          </Col>
        </Row>
        <div className="ht-footer-bottom d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span>&copy; {new Date().getFullYear()} HealthTrack. All rights reserved.</span>
          <span>Made with React and Bootstrap.</span>
        </div>
      </Container>
    </footer>
  )
}
