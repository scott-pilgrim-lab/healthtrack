import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'
import { sendMessage } from '../services/storage'

const EMPTY_FORM = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Returns an object with one message per invalid field (empty object = valid).
function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Your name must be at least 2 characters.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email, for example name@example.com.'

  if (!message) errors.message = 'Please write a message.'
  else if (message.length < 10) errors.message = 'Your message must be at least 10 characters.'

  return errors
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sentTo, setSentTo] = useState(null) // name of the sender once submitted

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear a field's error as soon as the user starts fixing it.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // Validate a single field when the user leaves it.
  const handleBlur = (event) => {
    const { name } = event.target
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      // Move focus to the first problem so keyboard users land on it.
      event.currentTarget.elements[firstInvalid]?.focus()
      return
    }

    await sendMessage({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    })
    setSentTo(values.name.trim())
    setValues(EMPTY_FORM)
  }

  return (
    <>
      <title>Contact | HealthTrack</title>
      <PageHeader
        eyebrow="Contact"
        title="Questions, ideas or feedback?"
        lead="Send a message and tell me what you think of HealthTrack or what you would like to see next."
      />

      <section className="ht-section-tight pb-0">
        <Container>
          <Row className="g-4 g-lg-5">
            <Col lg={7}>
              <Card>
                <Card.Body className="p-4 p-md-5">
                  {sentTo ? (
                    // Success state replaces the form after a valid submit.
                    <div role="status">
                      <Alert variant="success" className="d-flex gap-3 align-items-start mb-4">
                        <span className="ht-chip tone-ink">
                          <Icon name="check" />
                        </span>
                        <div>
                          <Alert.Heading as="h2" className="h5 mb-1">
                            Thanks, {sentTo}. Your message was received.
                          </Alert.Heading>
                          <p className="mb-0">
                            It has been saved on this device. Email delivery arrives with the
                            backend in Phase 2.
                          </p>
                        </div>
                      </Alert>
                      <Button variant="outline-primary" onClick={() => setSentTo(null)}>
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    // noValidate turns off the browser's bubbles so our own
                    // inline messages are the only ones shown.
                    <Form noValidate onSubmit={handleSubmit}>
                      <h2 className="h4 mb-1">Send a message</h2>
                      <p className="text-muted mb-4">All fields are required.</p>

                      <Row className="g-3">
                        <Form.Group as={Col} md={6} controlId="contact-name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Your name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          />
                          <Form.Control.Feedback type="invalid" id="contact-name-error">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md={6} controlId="contact-email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="name@example.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          />
                          <Form.Control.Feedback type="invalid" id="contact-email-error">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} xs={12} controlId="contact-message">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            placeholder="How can I help?"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? 'contact-message-error' : undefined}
                          />
                          <Form.Control.Feedback type="invalid" id="contact-message-error">
                            {errors.message}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Col xs={12}>
                          <Button type="submit" variant="primary" size="lg">
                            <Icon name="mail" size={18} className="me-2" />
                            Send message
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <h2 className="h4">Before you write</h2>
              <p className="text-muted">A few quick answers to the most common questions.</p>

              <div className="d-flex gap-3 mb-4">
                <span className="ht-chip tone-sky">
                  <Icon name="database" />
                </span>
                <div>
                  <h3 className="h6 mb-1">Where is my data stored?</h3>
                  <p className="text-muted mb-0">
                    In your browser's local storage. Nothing leaves your device in this version.
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <span className="ht-chip tone-amber">
                  <Icon name="target" />
                </span>
                <div>
                  <h3 className="h6 mb-1">Is HealthTrack free?</h3>
                  <p className="text-muted mb-0">
                    Yes. It is a university project with no accounts, ads or subscriptions.
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3">
                <span className="ht-chip">
                  <Icon name="calendar" />
                </span>
                <div>
                  <h3 className="h6 mb-1">What is coming next?</h3>
                  <p className="text-muted mb-0">
                    Phase 2 adds a backend and database, so your entries can follow you across
                    devices.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
