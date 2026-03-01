export default function MoominCouple({ size = 200, className = '' }) {
  return (
    <svg className={className} width={size} height={size * 0.75} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hearts */}
      <path d="M 20 20 C 20 10 35 10 40 20 C 45 10 60 10 60 20 C 60 35 40 50 40 50 C 40 50 20 35 20 20 Z" fill="#FF82A9" stroke="#2C3E50" strokeWidth="1.5"/>
      <path d="M 150 25 C 150 15 165 15 170 25 C 175 15 190 15 190 25 C 190 40 170 55 170 55 C 170 55 150 40 150 25 Z" fill="#FF82A9" stroke="#2C3E50" strokeWidth="1.5"/>

      {/* === Snorkmaiden (left) === */}
      <path d="M 25 100 Q 15 110 20 125" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 20 125 Q 10 125 15 135 Q 25 135 20 125 Z" fill="white" stroke="#2C3E50" strokeWidth="2"/>
      <path d="M 70 60 C 90 80 85 110 80 120 C 75 130 40 135 30 120 C 20 105 30 70 50 60 Z" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 35 125 L 35 135 Q 35 140 45 140 L 45 125" fill="white" stroke="#2C3E50" strokeWidth="2.5"/>
      <path d="M 34 133 L 46 130 L 46 135 L 34 138 Z" fill="#FAD02C" stroke="#2C3E50" strokeWidth="2"/>
      <path d="M 60 123 L 65 135 Q 70 140 75 138 L 75 122" fill="white" stroke="#2C3E50" strokeWidth="2.5"/>
      <path d="M 35 85 Q 25 95 30 105 Q 35 105 40 100" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Head */}
      <path d="M 75 45 C 85 45 95 55 90 70 C 85 85 75 80 70 70 C 65 60 55 50 50 45 C 45 40 55 25 65 25 C 70 25 70 45 75 45 Z" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 65 25 C 50 25 45 40 45 50" fill="white" stroke="#2C3E50" strokeWidth="2.5"/>
      <path d="M 50 25 C 55 18 65 18 70 25 C 70 35 55 35 50 25 Z" fill="#FAD02C" stroke="#2C3E50" strokeWidth="2"/>
      <path d="M 54 26 L 54 33 M 60 25 L 60 34 M 65 26 L 65 32" stroke="#2C3E50" strokeWidth="1.5"/>
      <path d="M 52 25 L 50 15 L 58 20 M 65 20 L 68 12 L 72 20" fill="white" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
      <ellipse cx="60" cy="45" rx="3.5" ry="5.5" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
      <ellipse cx="61" cy="45" rx="1.5" ry="2.5" fill="#5C4033"/>
      <path d="M 58 40 L 56 36 M 60 39 L 59 35 M 62 40 L 63 36" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="73" cy="47" rx="3.5" ry="5.5" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
      <ellipse cx="74" cy="47" rx="1.5" ry="2.5" fill="#5C4033"/>

      {/* === Moomin (right) === */}
      <path d="M 120 60 C 100 80 100 110 110 125 C 120 140 150 140 160 125 C 170 110 160 80 140 60 Z" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 120 130 L 115 142 Q 110 145 105 142 L 110 125" fill="white" stroke="#2C3E50" strokeWidth="2.5"/>
      <path d="M 145 130 L 145 142 Q 150 145 155 142 L 155 125" fill="white" stroke="#2C3E50" strokeWidth="2.5"/>
      <path d="M 160 85 Q 170 95 160 105 Q 150 105 145 100" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 160 115 Q 175 110 185 115" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 185 115 Q 195 110 190 120 Q 180 125 185 115 Z" fill="white" stroke="#2C3E50" strokeWidth="2"/>
      {/* Head */}
      <path d="M 115 45 C 100 45 90 55 95 70 C 100 85 115 80 125 70 C 130 60 140 50 145 45 C 150 40 140 25 130 25 C 125 25 120 45 115 45 Z" fill="white" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 130 25 C 145 25 150 40 150 50" fill="white" stroke="#2C3E50" strokeWidth="2.5"/>
      <path d="M 135 25 L 138 15 L 143 21 M 125 25 L 123 18 L 118 25" fill="white" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
      <ellipse cx="120" cy="45" rx="3.5" ry="5.5" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
      <ellipse cx="119" cy="45" rx="2" ry="3" fill="#00A8C6"/>
      <ellipse cx="135" cy="43" rx="3.5" ry="5.5" fill="white" stroke="#2C3E50" strokeWidth="1.5"/>
      <ellipse cx="134" cy="43" rx="2" ry="3" fill="#00A8C6"/>

      {/* === Holding hands === */}
      <path d="M 78 80 Q 90 95 95 105" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 115 85 Q 105 95 95 105" fill="none" stroke="#2C3E50" strokeWidth="2.5" strokeLinecap="round"/>

      {/* === Shared orange scarf === */}
      <path d="M 50 65 C 65 75 80 80 90 70 C 80 60 65 60 55 60 Z" fill="#E84824" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 105 70 C 115 80 135 75 145 65 C 135 60 120 60 110 60 Z" fill="#E84824" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 85 68 C 95 72 105 72 115 68 C 110 78 95 78 85 68 Z" fill="#E84824" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 140 65 C 160 55 180 50 190 55 C 185 65 170 70 145 75 Z" fill="#E84824" stroke="#2C3E50" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M 190 55 L 195 50 L 190 62" fill="#E84824" stroke="#2C3E50" strokeWidth="2"/>
      {/* White polka dots on scarf */}
      <circle cx="60"  cy="65" r="2.5" fill="white"/>
      <circle cx="75"  cy="70" r="2"   fill="white"/>
      <circle cx="85"  cy="73" r="1.5" fill="white"/>
      <circle cx="100" cy="74" r="2"   fill="white"/>
      <circle cx="115" cy="71" r="2.5" fill="white"/>
      <circle cx="130" cy="67" r="2"   fill="white"/>
      <circle cx="150" cy="62" r="2"   fill="white"/>
      <circle cx="165" cy="58" r="1.5" fill="white"/>
      <circle cx="180" cy="55" r="1.5" fill="white"/>
    </svg>
  )
}
