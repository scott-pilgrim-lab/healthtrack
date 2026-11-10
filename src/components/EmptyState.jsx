import Icon from './Icon'

// Friendly placeholder shown when a list has nothing to display.
// `children` is an optional action, e.g. a button.
export default function EmptyState({ icon = 'list', title, text, children }) {
  return (
    <div className="ht-empty">
      <span className="ht-chip">
        <Icon name={icon} />
      </span>
      <h3>{title}</h3>
      <p className={children ? 'mb-3' : 'mb-0'}>{text}</p>
      {children}
    </div>
  )
}
