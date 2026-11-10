import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Icon from './Icon'
import { toDateKey } from '../utils/date'

// Starting values for a form: today's date, everything else empty.
const initialValues = (fields) =>
  Object.fromEntries(fields.map((field) => [field.name, field.type === 'date' ? toDateKey() : '']))

// "Duration (min)" -> "Duration", for use inside error messages.
const plainLabel = (field) => field.label.replace(/\s*\(.*\)$/, '')

function validateField(field, rawValue) {
  const value = String(rawValue).trim()

  if (!value) return field.required ? `${plainLabel(field)} is required.` : null

  if (field.type === 'number') {
    const number = Number(value)
    if (Number.isNaN(number)) return `${plainLabel(field)} must be a number.`
    if (field.min !== undefined && number < field.min) {
      return `${plainLabel(field)} must be ${field.min} or more.`
    }
  }

  if (field.type === 'date' && value > toDateKey()) return 'Date cannot be in the future.'

  return null
}

/**
 * Generic "add entry" form. It builds its inputs from `config.fields`
 * (see src/data/entryTypes.js), so the same component serves all trackers.
 *
 * Props:
 *  - config: one of the ENTRY_TYPES blocks
 *  - onAdd(entry): called with the cleaned values when the form is valid
 */
export default function EntryForm({ config, onAdd }) {
  const { fields, singular, key } = config
  const [values, setValues] = useState(() => initialValues(fields))
  const [errors, setErrors] = useState({})
  const [justAdded, setJustAdded] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
    if (justAdded) setJustAdded('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const found = {}
    fields.forEach((field) => {
      const message = validateField(field, values[field.name])
      if (message) found[field.name] = message
    })
    setErrors(found)

    const firstInvalid = fields.find((field) => found[field.name])
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid.name]?.focus()
      return
    }

    // Convert the strings from the inputs into clean values before saving.
    const entry = {}
    fields.forEach((field) => {
      const value = String(values[field.name]).trim()
      if (field.type === 'number') entry[field.name] = value === '' ? null : Number(value)
      else entry[field.name] = value
    })

    onAdd(entry)
    setJustAdded(entry.name)
    // Keep the chosen date so several entries for one day are quick to add.
    setValues({ ...initialValues(fields), date: values.date })
  }

  return (
    <Form noValidate onSubmit={handleSubmit} aria-label={`Add ${singular}`}>
      <Row className="g-3">
        {fields.map((field) => {
          const id = `${key}-${field.name}`
          const error = errors[field.name]
          const common = {
            name: field.name,
            value: values[field.name],
            onChange: handleChange,
            isInvalid: Boolean(error),
            'aria-describedby': error ? `${id}-error` : undefined,
          }

          return (
            <Form.Group as={Col} xs={field.half ? 6 : 12} controlId={id} key={field.name}>
              <Form.Label>
                {field.label}
                {!field.required && <span className="fw-normal text-muted"> (optional)</span>}
              </Form.Label>

              {field.type === 'select' ? (
                <Form.Select {...common}>
                  <option value="">Choose...</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              ) : field.type === 'textarea' ? (
                <Form.Control as="textarea" rows={2} placeholder={field.placeholder} {...common} />
              ) : (
                <Form.Control
                  type={field.type}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.type === 'date' ? toDateKey() : undefined}
                  inputMode={field.type === 'number' ? 'numeric' : undefined}
                  {...common}
                />
              )}

              <Form.Control.Feedback type="invalid" id={`${id}-error`}>
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          )
        })}

        <Col xs={12}>
          <Button type="submit" variant="primary" className="w-100">
            <Icon name="plus" size={18} className="me-1" />
            Add {singular}
          </Button>
          {/* Announced by screen readers after a successful add. */}
          <p className="small text-success fw-bold mt-2 mb-0" role="status">
            {justAdded && (
              <>
                <Icon name="check" size={16} className="me-1" />
                Added &ldquo;{justAdded}&rdquo;
              </>
            )}
          </p>
        </Col>
      </Row>
    </Form>
  )
}
