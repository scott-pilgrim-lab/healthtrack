import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Brand from './Brand'
import { NAV_LINKS } from '../data/navLinks'

export default function AppNavbar() {
  return (
    // collapseOnSelect closes the mobile menu after a link is tapped.
    <Navbar expand="lg" variant="dark" sticky="top" collapseOnSelect className="ht-navbar ht-dark">
      <Container>
        <Brand />
        <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation" />
        <Navbar.Collapse id="main-nav">
          <Nav as="ul" className="ms-auto align-items-lg-center gap-lg-1 list-unstyled mb-0">
            {NAV_LINKS.map((link) => (
              <Nav.Item as="li" key={link.to}>
                {/* NavLink adds the "active" class (and aria-current) for the
                    current route; `end` stops "/" matching every page. */}
                <Nav.Link as={NavLink} to={link.to} end={link.to === '/'} eventKey={link.to}>
                  {link.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
