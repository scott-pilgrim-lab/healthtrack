import { Col, Container, Row } from 'react-bootstrap'

// Dark banner at the top of the inner pages. `children` is optional extra
// content (e.g. buttons) shown on the right on wide screens.
export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="ht-page-header ht-dark">
      <Container>
        <Row className="align-items-end gy-3">
          <Col lg={children ? 8 : 9} className="ht-rise">
            {eyebrow && <span className="ht-eyebrow">{eyebrow}</span>}
            <h1 className="mb-2">{title}</h1>
            {lead && <p className="lead mb-0">{lead}</p>}
          </Col>
          {children && (
            <Col lg={4} className="d-flex justify-content-lg-end gap-2 flex-wrap">
              {children}
            </Col>
          )}
        </Row>
      </Container>
    </header>
  )
}
