import { useState, useMemo, useEffect, useRef } from 'react'
import { Globe, Info, Download, Upload } from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`

import translations from './i18n/translations'
import eventsData from './data/events'
import MoominBackground from './components/svgs/MoominBackground'
import MoominHouse from './components/svgs/MoominHouse'
import SittingFlora from './components/svgs/SittingFlora'
import Calendar from './components/Calendar'
import EventCard from './components/EventCard'
import LoginScreen from './components/LoginScreen'

// Credentials come from .env.local (git-ignored) — never committed to GitHub.
// Vite exposes only variables prefixed with VITE_ to the browser bundle.
const APP_USER = import.meta.env.VITE_APP_USER ?? 'admin'
const APP_PASS = import.meta.env.VITE_APP_PASS ?? '123'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [lang, setLang] = useState('zh-TW')

  // Track the month currently being viewed (default: March 2026)
  const [viewDate, setViewDate] = useState(new Date(2026, 2, 1))
  const [selectedDate, setSelectedDate] = useState(null)

  const calendarRef = useRef(null)

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('canice_events')
    return saved ? JSON.parse(saved) : eventsData
  })

  // Persist events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('canice_events', JSON.stringify(events))
  }, [events])

  const t = translations[lang]
  const monthFormatter = new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long' })
  const displayMonthLabel = monthFormatter.format(viewDate)

  const handleLogin = (username, password) => {
    if (username === APP_USER && password === APP_PASS) {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError(
        lang === 'zh-TW' ? '使用者名稱或密碼無效' : 'Invalid username or password'
      )
    }
  }

  const handleSave = (id, form) => {
    const [y, m, d] = form.fullDate.split('-').map(Number)
    const formFields = { ...form, year: y, month: m - 1, date: d }
    delete formFields.fullDate

    setEvents((prev) => {
      // If it's a new event (id is temporary)
      if (typeof id === 'string' && id.startsWith('new_')) {
        const newEvent = {
          id: Date.now(),
          ...formFields,
          isEdited: true
        }
        return [...prev.filter(e => e.id !== id), newEvent]
      }
      // Update existing
      return prev.map((e) => (e.id === id ? { ...e, ...formFields, isEdited: true } : e))
    })
  }

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const handleAddNewEvent = () => {
    const newId = `new_${Date.now()}`

    // Default to the selected date. 
    // If none is selected, default to today if viewing the current month, otherwise the 1st.
    let d = selectedDate
    if (!d) {
      const today = new Date()
      if (viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth()) {
        d = today.getDate()
      } else {
        d = 1
      }
    }

    setEvents((prev) => [
      ...prev,
      {
        id: newId,
        date: d,
        year: viewDate.getFullYear(),
        month: viewDate.getMonth(),
        start: '12:00',
        end: '13:00',
        customTitle: '',
        location: '',
        customRemarks: '',
        isEdited: true,
        isNew: true // Flag to automatically set to editing mode
      }
    ])
  }

  const handleExportPDF = async () => {
    if (!calendarRef.current) return
    try {
      // Temporarily hide UI elements we don't want in the PDF (if any) by adding a specific class
      const canvas = await html2canvas(calendarRef.current, {
        scale: 2, // High quality
        useCORS: true,
        backgroundColor: '#A8D0D6' // Match Theme
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Canice_Calendar_${viewDate.getFullYear()}_${viewDate.getMonth() + 1}.pdf`)
    } catch (err) {
      console.error('Failed to export PDF', err)
      alert(lang === 'zh-TW' ? '匯出 PDF 失敗' : 'Failed to export PDF')
    }
  }

  const handleImportPDF = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

      const importedEvents = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        // Group by columns (y-coord -> col, x-coord -> row) due to landscape rotation
        const items = textContent.items
          .filter(item => item.str.trim() !== '')
          .map(item => ({
            text: item.str.trim(),
            col: Math.round(item.transform[5] / 10) * 10,
            row: Math.round(item.transform[4] / 10) * 10
          }))

        const columns = {}
        items.forEach(item => {
          if (!columns[item.col]) columns[item.col] = []
          columns[item.col].push(item)
        })

        const eventsByDate = {}

        for (const col of Object.keys(columns).sort((a, b) => a - b)) {
          columns[col].sort((a, b) => a.row - b.row) // Top to bottom

          let currentDate = null;
          let currentBlock = [];
          let lastRow = null;

          for (const item of columns[col]) {
            if (/^\d{1,2}$/.test(item.text)) {
              const num = parseInt(item.text, 10)
              if (num >= 1 && num <= 31) {
                if (currentDate && currentBlock.length > 0) {
                  if (!eventsByDate[currentDate]) eventsByDate[currentDate] = []
                  eventsByDate[currentDate].push(currentBlock.join(' '))
                }
                currentDate = num
                currentBlock = []
                lastRow = null
                continue
              }
            }

            if (/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i.test(item.text)) continue

            if (currentDate) {
              if (lastRow === null || Math.abs(lastRow - item.row) > 15) {
                if (currentBlock.length > 0) {
                  if (!eventsByDate[currentDate]) eventsByDate[currentDate] = []
                  eventsByDate[currentDate].push(currentBlock.join(' '))
                }
                currentBlock = [item.text]
              } else {
                currentBlock.push(item.text)
              }
              lastRow = item.row
            }
          }
          if (currentDate && currentBlock.length > 0) {
            if (!eventsByDate[currentDate]) eventsByDate[currentDate] = []
            eventsByDate[currentDate].push(currentBlock.join(' '))
          }
        }

        // Create events from non-empty blocks
        for (const dateStr of Object.keys(eventsByDate)) {
          const dateNum = parseInt(dateStr, 10)
          for (const block of eventsByDate[dateStr]) {
            if (block.length > 2) {
              importedEvents.push({
                id: `imported_${Date.now()}_${Math.random()}`,
                date: dateNum,
                year: viewDate.getFullYear(),
                month: viewDate.getMonth(),
                start: '12:00', // Default start
                end: '13:00', // Default end
                customTitle: block.substring(0, 50), // Auto-title
                location: '',
                customRemarks: block,
                isEdited: true
              })
            }
          }
        }
      }

      if (importedEvents.length > 0) {
        setEvents(prev => [...prev, ...importedEvents])
        alert(lang === 'zh-TW' ? `成功匯入 ${importedEvents.length} 項行程！` : `Successfully imported ${importedEvents.length} events!`)
      } else {
        alert(lang === 'zh-TW' ? '找不到任何行程。' : 'No events found in this PDF.')
      }

    } catch (err) {
      console.error('Import error:', err)
      alert(lang === 'zh-TW' ? '讀取 PDF 失敗' : 'Failed to read PDF')
    }

    // Reset file input
    e.target.value = null
  }

  const filteredEvents = useMemo(() => {
    // Determine which events apply to the current view month/year
    // For legacy events in eventsData without year/month, assume they belong to March 2026.
    const monthEvents = events.filter((e) => {
      const eYear = e.year ?? 2026
      const eMonth = e.month ?? 2 // 2 = March
      return eYear === viewDate.getFullYear() && eMonth === viewDate.getMonth()
    })

    const sorted = [...monthEvents].sort((a, b) =>
      a.date !== b.date ? a.date - b.date : a.start.localeCompare(b.start)
    )
    return selectedDate === null ? sorted : sorted.filter((e) => e.date === selectedDate)
  }, [selectedDate, events, viewDate])

  if (!isLoggedIn) {
    return (
      <LoginScreen
        lang={lang}
        setLang={setLang}
        onLogin={handleLogin}
        loginError={loginError}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#A8D0D6] text-[#2C3E50] font-sans selection:bg-[#7BA4A8]/30 relative pb-12 overflow-x-hidden">
      <MoominBackground />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20 border-b border-white/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MoominHouse size={32} />
            <h1 className="text-xl font-bold text-[#2C3E50] tracking-wide hidden sm:block">
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-[#E8F1F2] px-3 py-1.5 rounded-full border border-white">
            <Globe size={16} className="text-[#7BA4A8]" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-[#2C3E50] focus:ring-0 cursor-pointer outline-none"
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 relative z-10" ref={calendarRef}>

        {/* Left — Calendar */}
        <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-5">
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            viewDate={viewDate}
            setViewDate={setViewDate}
            monthLabel={displayMonthLabel}
          />
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 flex gap-3 text-sm text-[#2C3E50] items-start shadow-md border-2 border-white">
            <Info size={18} className="flex-shrink-0 mt-0.5 text-[#7BA4A8]" />
            <p className="font-medium leading-relaxed">{t.clickHint}</p>
          </div>

          {/* Export/Import Tools */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={handleExportPDF}
              className="w-full flex items-center justify-center gap-2 bg-white/60 hover:bg-white/90 text-[#2C3E50] border-2 border-white px-4 py-3 rounded-2xl font-bold transition-all shadow-sm"
            >
              <Download size={18} className="text-[#7BA4A8]" />
              {t.exportPDF || 'Export PDF'}
            </button>
            <label className="w-full flex items-center justify-center gap-2 bg-white/60 hover:bg-white/90 text-[#2C3E50] border-2 border-white px-4 py-3 rounded-2xl font-bold transition-all shadow-sm cursor-pointer">
              <Upload size={18} className="text-[#819A71]" />
              {t.importPDF || 'Import PDF'}
              <input type="file" accept="application/pdf" className="hidden" onChange={handleImportPDF} />
            </label>
          </div>
        </div>

        {/* Right — Event list */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="flex items-center justify-between mb-6 bg-white/60 backdrop-blur-sm px-6 py-4 rounded-[2rem] border-2 border-white shadow-sm">
            <h2 className="text-2xl font-bold text-[#2C3E50] tracking-wide">
              {selectedDate ? `${monthFormatter.format(viewDate).split(' ')[0]} ${selectedDate}, ${viewDate.getFullYear()}` : t.upcomingEvents}
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddNewEvent}
                className="text-sm font-bold text-[#819A71] hover:bg-[#819A71]/10 px-4 py-2 rounded-full transition-colors border border-[#819A71]/20"
              >
                + {t.addEvent || 'Add Event'}
              </button>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-sm font-bold text-[#D2605A] hover:bg-[#D2605A]/10 px-4 py-2 rounded-full transition-colors border border-[#D2605A]/20"
                >
                  {t.clearFilter}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {filteredEvents.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-md border-4 border-white rounded-[2rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
                <div className="mb-4 animate-bounce-slow">
                  <SittingFlora size={140} className="drop-shadow-sm" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{t.noEvents}</h3>
                <p className="text-[#7BA4A8] font-medium">{t.restMessage || '享受平靜與安寧吧。'}</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  t={t}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
