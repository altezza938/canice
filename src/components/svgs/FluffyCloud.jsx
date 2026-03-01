export default function FluffyCloud({ size = 100, opacity = 1, className = '' }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="white"
      opacity={opacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 25 45 C 10 45 10 25 25 25 C 30 10 50 5 60 20 C 75 10 95 20 90 40 C 95 55 75 60 65 45 C 55 55 35 55 25 45 Z" fill="white"/>
    </svg>
  )
}
