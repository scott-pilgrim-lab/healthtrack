import { Card } from 'react-bootstrap'
import Icon from './Icon'

// Card with an icon chip, a title, a description and an optional bullet list.
// Used on the Home, About and Features pages.
export default function FeatureCard({ icon, tone, title, text, points = [], headingLevel = 'h3' }) {
  return (
    <Card className="ht-feature-card ht-card-hover h-100">
      <Card.Body>
        <span className={`ht-chip ${tone ? `tone-${tone}` : ''}`}>
          <Icon name={icon} size={22} />
        </span>
        <Card.Title as={headingLevel}>{title}</Card.Title>
        <Card.Text className="text-muted mb-0">{text}</Card.Text>
        {points.length > 0 && (
          <ul>
            {points.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  )
}
