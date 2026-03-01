import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']
export default function Calendar({ events, selectedDate, onSelectDate, viewDate, setViewDate, monthLabel }) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const eventDates = new Set(
    events
      .filter((e) => (e.year ?? 2026) === year && (e.month ?? 2) === month)
      .map((e) => e.date)
  )

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOffset = new Date(year, month, 1).getDay()

  const handlePrev = () => {
    setViewDate(new Date(year, month - 1, 1))
    onSelectDate(null)
  }

  const handleNext = () => {
    setViewDate(new Date(year, month + 1, 1))
    onSelectDate(null)
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border-4 border-white relative z-10">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrev}
          className="p-2 text-[#7BA4A8] hover:text-[#2C3E50] hover:bg-[#E8F1F2] rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-[#2C3E50] tracking-wide">{monthLabel}</h2>
        <button
          onClick={handleNext}
          className="p-2 text-[#7BA4A8] hover:text-[#2C3E50] hover:bg-[#E8F1F2] rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-center font-bold text-[#7BA4A8] text-xs py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOffset }, (_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1
          const hasEvents = eventDates.has(d)
          const isSelected = selectedDate === d
          return (
            <button
              key={d}
              onClick={() => onSelectDate(isSelected ? null : d)}
              className={`
                relative p-2 md:p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-300
                ${isSelected
                  ? 'bg-[#7BA4A8] text-white shadow-md shadow-[#7BA4A8]/40 scale-105'
                  : 'hover:bg-[#E8F1F2] text-[#2C3E50] bg-transparent'}
                ${hasEvents && !isSelected ? 'font-bold' : ''}
              `}
            >
              <span className="text-sm md:text-base">{d}</span>
              {hasEvents && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-[#FCE588]' : 'bg-[#D2605A]'}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
