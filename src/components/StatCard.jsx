import { Card } from 'react-bootstrap'
import Icon from './Icon'
import { formatNumber } from '../utils/stats'

// One summary number at the top of the dashboard.
export default function StatCard({ icon, tone, label, value, unit, hint }) {
  return (
    <Card className="ht-stat-card ht-card-hover h-100">
      <Card.Body>
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className={`ht-chip ${tone ? `tone-${tone}` : ''}`}>
            <Icon name={icon} />
          </span>
          <span className="ht-stat-label">{label}</span>
        </div>
        <div className="ht-stat-value">
          {formatNumber(value)}
          {unit && <span className="ht-stat-unit">{unit}</span>}
        </div>
        {hint && <div className="small text-muted mt-1">{hint}</div>}
      </Card.Body>
    </Card>
  )
}
