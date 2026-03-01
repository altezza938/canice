// Moomin & Snorkmaiden — official Moomin artwork from moomin.com
// Moomintroll faces right (flipped) so both characters look toward each other
export default function MoominCouple({ size = 200, className = '' }) {
  const w = size
  const h = Math.round(size * 0.75)
  const charSize = Math.round(size * 0.6)

  return (
    <div
      className={`flex items-end justify-center gap-1 ${className}`}
      style={{ width: w, height: h }}
    >
      {/* Moomintroll on the left, mirrored so he faces right toward Snorkmaiden */}
      <img
        src="/moomintroll.svg"
        alt="Moomintroll"
        width={charSize}
        height={charSize}
        style={{ transform: 'scaleX(-1)' }}
      />
      {/* Snorkmaiden on the right */}
      <img
        src="/snorkmaiden.svg"
        alt="Snorkmaiden"
        width={charSize}
        height={charSize}
      />
    </div>
  )
}
