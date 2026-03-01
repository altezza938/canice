// Snorkmaiden (Flora) sitting — official Moomin artwork from moomin.com
export default function SittingFlora({ size = 150, className = '' }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}snorkmaiden.svg`}
      alt="Snorkmaiden"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
