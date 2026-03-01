export default function SittingFlora({ size = 150, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grass */}
      <path d="M 15 85 L 20 65 M 20 85 L 25 70 M 25 85 L 30 75 M 30 85 L 35 70" stroke="#6D855E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 85 L 65 70 M 65 85 L 70 75 M 70 85 L 75 70 M 75 85 L 80 75" stroke="#6D855E" strokeWidth="2" strokeLinecap="round"/>
      {/* Body (sitting) */}
      <path d="M 40 45 C 20 45 30 85 40 85 L 60 85 C 70 85 80 45 60 45 Z" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Right leg (stretched out) */}
      <path d="M 35 80 L 15 75 Q 10 75 12 70 L 25 65" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 23 74 L 27 66 L 23 64 L 19 72 Z" fill="#FAD02C" stroke="#2C3E50" strokeWidth="2"/>
      {/* Left leg (bent) */}
      <path d="M 45 80 L 40 90 Q 45 95 50 90 L 55 80" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 43 85 L 53 85 L 52 90 L 44 90 Z" fill="#FAD02C" stroke="#2C3E50" strokeWidth="2"/>
      {/* Tail */}
      <path d="M 75 75 Q 85 75 85 85" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 85 85 Q 95 80 90 90 Q 80 95 85 85 Z" fill="#FAD02C" stroke="#2C3E50" strokeWidth="2"/>
      {/* Flowers on lap */}
      <circle cx="50" cy="75" r="6" fill="#00A8C6" stroke="#2C3E50" strokeWidth="1.5"/>
      <circle cx="50" cy="75" r="2" fill="#FAD02C"/>
      <circle cx="62" cy="72" r="6" fill="#FF82A9" stroke="#2C3E50" strokeWidth="1.5"/>
      <circle cx="62" cy="72" r="2" fill="white"/>
      {/* Head */}
      <path d="M 65 25 C 75 25 75 40 65 45 C 50 50 35 45 30 40 C 20 30 25 15 40 15 C 50 15 55 25 65 25 Z" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Golden fringe */}
      <path d="M 40 15 C 45 5 60 5 65 15 C 65 25 45 25 40 15 Z" fill="#FAD02C" stroke="#2C3E50" strokeWidth="2"/>
      <path d="M 45 7 L 45 18 M 50 5 L 50 19 M 55 7 L 55 18" stroke="#2C3E50" strokeWidth="1.5"/>
      {/* Eyes (looking up) */}
      <ellipse cx="43" cy="22" rx="4" ry="6" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
      <ellipse cx="43" cy="20" rx="1.5" ry="2.5" fill="#2C3E50"/>
      <ellipse cx="55" cy="24" rx="4" ry="6" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
      <ellipse cx="55" cy="22" rx="1.5" ry="2.5" fill="#2C3E50"/>
      {/* Arm holding flower */}
      <path d="M 60 40 Q 80 30 70 15" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"/>
      <path d="M 60 40 Q 80 30 70 15" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Flowers */}
      <circle cx="60" cy="12" r="7" fill="#00A8C6" stroke="#2C3E50" strokeWidth="1.5"/>
      <circle cx="60" cy="12" r="2.5" fill="white"/>
      <circle cx="72" cy="18" r="6" fill="#E86A33" stroke="#2C3E50" strokeWidth="1.5"/>
      <circle cx="72" cy="18" r="2" fill="#FAD02C"/>
      {/* Dandelion bottom right */}
      <path d="M 75 80 L 85 70 M 80 85 L 90 75 M 85 90 L 95 80" stroke="#FAD02C" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}
