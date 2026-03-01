import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']
// March 2026: 31 days, starts on Sunday (offset = 0)
const DAYS_IN_MONTH = 31
const FIRST_DAY_OFFSET = 0

export default function Calendar({ events, selectedDate, onSelectDate, monthLabel }) {
  const eventDates = new Set(events.map((e) => e.date))

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border-4 border-white relative z-10">
      <div className="flex items-center justify-between mb-6">
        {/* Navigation arrows are display-only for this fixed month */}
        <button className="p-2 text-[#7BA4A8] hover:text-[#2C3E50] hover:bg-[#E8F1F2] rounded-full transition-colors" aria-label="Previous month">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-[#2C3E50] tracking-wide">{monthLabel}</h2>
        <button className="p-2 text-[#7BA4A8] hover:text-[#2C3E50] hover:bg-[#E8F1F2] rounded-full transition-colors" aria-label="Next month">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-center font-bold text-[#7BA4A8] text-xs py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: FIRST_DAY_OFFSET }, (_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}

        {Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
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
