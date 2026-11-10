import { Link } from 'react-router-dom'

// Logo + wordmark, shared by the navbar and the footer.
export default function Brand() {
  return (
    <Link to="/" className="ht-brand" aria-label="HealthTrack home">
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="9" fill="#c8f03c" />
        <path
          d="M4 17h6l3-8 5 14 3-6h7"
          fill="none"
          stroke="#10201a"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Health<span>Track</span>
      </span>
    </Link>
  )
}
