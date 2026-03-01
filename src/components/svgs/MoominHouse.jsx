export default function MoominHouse({ size = 40, className = '' }) {
  return (
    <svg className={className} width={size} height={size * 1.5} viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,35 30,0 55,35" fill="#D2605A" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="35" width="40" height="50" rx="2" fill="#7BA4A8" stroke="#2C3E50" strokeWidth="2"/>
      <rect x="23" y="65" width="14" height="20" rx="6" fill="#E4B486" stroke="#2C3E50" strokeWidth="2"/>
      <circle cx="30" cy="22" r="4" fill="#FCE588" stroke="#2C3E50" strokeWidth="1.5"/>
      <rect x="18" y="45" width="8" height="10" rx="1" fill="#FCE588" stroke="#2C3E50" strokeWidth="1.5"/>
      <rect x="34" y="45" width="8" height="10" rx="1" fill="#FCE588" stroke="#2C3E50" strokeWidth="1.5"/>
      <path d="M 23 75 L 26 75" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
