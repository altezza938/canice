import { useState, useEffect } from 'react'
import { Clock, MapPin, Plus, Edit2, Check, X, Trash2 } from 'lucide-react'

function buildGCalLink(event, t) {
  const title = encodeURIComponent(event.isEdited ? event.customTitle : t[event.titleKey])

  let descText = event.descKey ? t[event.descKey] : ''
  if (event.customRemarks) {
    descText += descText ? `\n\n備註: ${event.customRemarks}` : `備註: ${event.customRemarks}`
  }

  const eYear = event.year ?? 2026
  const eMonth = event.month ?? 2 // March is 2
  const eDate = event.date ?? 1
  const dateStr = `${eYear}${String(eMonth + 1).padStart(2, '0')}${String(eDate).padStart(2, '0')}`
  const datePrefix = event.isEdited ? dateStr : (event.gcalStart ? event.gcalStart.substring(0, 8) : dateStr)

  const fmt = (time) => time.replace(':', '') + '00'
  const start = event.isEdited ? `${datePrefix}T${fmt(event.start)}` : event.gcalStart
  const end = event.isEdited ? `${datePrefix}T${fmt(event.end)}` : event.gcalEnd

  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${title}` +
    `&dates=${start}/${end}` +
    `&details=${encodeURIComponent(descText)}` +
    `&location=${event.location ? encodeURIComponent(event.location) : ''}` +
    `&ctz=Asia/Hong_Kong`
  )
}

export default function EventCard({ event, t, onSave, onDelete }) {
  const [editing, setEditing] = useState(event.isNew || false)
  const eYear = event.year ?? 2026
  const eMonth = event.month ?? 2
  const eDate = event.date ?? 1
  const eventDateString = `${eYear}-${String(eMonth + 1).padStart(2, '0')}-${String(eDate).padStart(2, '0')}`

  const [form, setForm] = useState({
    customTitle: event.isNew ? '' : (event.isEdited ? event.customTitle : t[event.titleKey]),
    fullDate: eventDateString,
    start: event.start,
    end: event.end,
    location: event.location || '',
    customRemarks: event.customRemarks || '',
  })

  // Keep form title in sync when language changes (only if not yet edited by user)
  const displayTitle = event.isEdited ? event.customTitle : t[event.titleKey]

  const handleEdit = () => {
    setForm({
      customTitle: displayTitle,
      fullDate: eventDateString,
      start: event.start,
      end: event.end,
      location: event.location || '',
      customRemarks: event.customRemarks || '',
    })
    setEditing(true)
  }

  const handleSave = () => {
    onSave(event.id, form)
    setEditing(false)
  }

  return (
    <div className="bg-white/95 backdrop-blur-md group p-5 md:p-6 rounded-[2rem] shadow-lg hover:shadow-xl border-4 border-white transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
      {/* Corner glow */}
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FCE588] rounded-full opacity-20 blur-xl" />

      {editing ? (
        <div className="flex-1 flex flex-col gap-3 w-full relative z-10">
          <input
            type="text"
            value={form.customTitle}
            onChange={(e) => setForm({ ...form, customTitle: e.target.value })}
            className="text-lg font-bold text-[#2C3E50] bg-[#E8F1F2]/50 border-2 border-transparent rounded-xl px-4 py-2.5 focus:bg-white focus:border-[#7BA4A8] outline-none transition-all"
          />
          <div className="flex flex-wrap gap-2 text-sm font-medium text-[#2C3E50]">
            <input
              type="date"
              value={form.fullDate}
              onChange={(e) => setForm({ ...form, fullDate: e.target.value })}
              required
              className="bg-[#E8F1F2]/50 border-2 border-transparent rounded-lg px-3 py-1.5 outline-none focus:bg-white focus:border-[#7BA4A8] transition-all"
            />
            <input
              type="time"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
              className="bg-[#E8F1F2]/50 border-2 border-transparent rounded-lg px-3 py-1.5 outline-none focus:bg-white focus:border-[#7BA4A8] transition-all"
            />
            <span className="self-center text-[#7BA4A8] font-bold">-</span>
            <input
              type="time"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
              className="bg-[#E8F1F2]/50 border-2 border-transparent rounded-lg px-3 py-1.5 outline-none focus:bg-white focus:border-[#7BA4A8] transition-all"
            />
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="地點 Location"
              className="bg-[#E8F1F2]/50 border-2 border-transparent rounded-lg px-3 py-1.5 outline-none focus:bg-white focus:border-[#7BA4A8] transition-all flex-1 min-w-[120px]"
            />
          </div>
          <textarea
            value={form.customRemarks}
            onChange={(e) => setForm({ ...form, customRemarks: e.target.value })}
            placeholder={t.remarksPlaceholder}
            className="w-full text-sm bg-[#E8F1F2]/50 border-2 border-transparent rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-[#7BA4A8] transition-all min-h-[80px] resize-none text-[#2C3E50]"
          />
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 px-4 py-2 text-[#D2605A] hover:bg-[#FFF0F0] rounded-xl text-sm font-bold transition-colors"
            >
              <X size={16} /> {t.cancel}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#819A71] text-white hover:bg-[#6D855E] rounded-xl text-sm font-bold transition-colors shadow-md shadow-[#819A71]/30"
            >
              <Check size={16} /> {t.save}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start sm:items-center gap-5 flex-1 relative z-10">
            {/* Date badge */}
            <div className="bg-[#7BA4A8] text-white min-w-[65px] flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl flex-shrink-0 shadow-inner">
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">Mar</span>
              <span className="text-2xl font-black leading-none my-1 drop-shadow-sm">{event.date}</span>
            </div>

            {/* Event details */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-1.5 group-hover:text-[#D2605A] transition-colors tracking-wide">
                {displayTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-[#7BA4A8]">
                <div className="flex items-center gap-2 bg-[#E8F1F2] px-3 py-1 rounded-lg">
                  <Clock size={14} className="text-[#2C3E50]" />
                  <span className="text-[#2C3E50]">{event.start} - {event.end}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="opacity-80" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {(event.descKey || event.customRemarks) && (
                <div className="mt-3 space-y-1.5">
                  {event.descKey && (
                    <p className="text-sm font-medium text-[#2C3E50] bg-[#FCE588]/40 border border-[#FCE588] inline-block px-3 py-1.5 rounded-lg">
                      {t[event.descKey]}
                    </p>
                  )}
                  {event.customRemarks && (
                    <p className="text-sm text-[#2C3E50] bg-[#E8F1F2] border border-[#7BA4A8]/20 block px-4 py-2 rounded-xl mt-1 leading-relaxed">
                      <strong className="text-[#7BA4A8]">備註 (Remarks):</strong> {event.customRemarks}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex-shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0 relative z-10">
            <a
              href={buildGCalLink(event, t)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#819A71] border-2 border-[#819A71] text-white hover:bg-[#6D855E] hover:border-[#6D855E] px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-[#819A71]/20"
            >
              <Plus size={16} />
              {t.addToCalendar}
            </a>
            <button
              onClick={handleEdit}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#E8F1F2] text-[#7BA4A8] hover:bg-[#E8F1F2] hover:text-[#2C3E50] px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              <Edit2 size={16} />
              <span className="hidden sm:inline">{t.edit}</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm(t.confirmDelete || '確定刪除？ Are you sure you want to delete this event?')) {
                  onDelete(event.id)
                }
              }}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#FFF0F0] text-[#D2605A] hover:bg-[#FFF0F0] hover:text-[#D2605A] px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">{t.delete || '刪除'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
