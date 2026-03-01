import { useState, useMemo } from 'react'
import { Globe, Info } from 'lucide-react'

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
  const [isLoggedIn, setIsLoggedIn]   = useState(false)
  const [loginError, setLoginError]   = useState('')
  const [lang, setLang]               = useState('zh-TW')
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents]           = useState(eventsData)

  const t = translations[lang]

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
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...form, isEdited: true } : e))
    )
  }

  const filteredEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) =>
      a.date !== b.date ? a.date - b.date : a.start.localeCompare(b.start)
    )
    return selectedDate === null ? sorted : sorted.filter((e) => e.date === selectedDate)
  }, [selectedDate, events])

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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 relative z-10">

        {/* Left — Calendar */}
        <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col gap-5">
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            monthLabel={t.month}
          />
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 flex gap-3 text-sm text-[#2C3E50] items-start shadow-md border-2 border-white">
            <Info size={18} className="flex-shrink-0 mt-0.5 text-[#7BA4A8]" />
            <p className="font-medium leading-relaxed">{t.clickHint}</p>
          </div>
        </div>

        {/* Right — Event list */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="flex items-center justify-between mb-6 bg-white/60 backdrop-blur-sm px-6 py-4 rounded-[2rem] border-2 border-white shadow-sm">
            <h2 className="text-2xl font-bold text-[#2C3E50] tracking-wide">
              {selectedDate ? `Mar ${selectedDate}, 2026` : t.upcomingEvents}
            </h2>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm font-bold text-[#D2605A] hover:bg-[#D2605A]/10 px-4 py-2 rounded-full transition-colors border border-[#D2605A]/20"
              >
                {t.clearFilter}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-5">
            {filteredEvents.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-md border-4 border-white rounded-[2rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
                <div className="mb-4 animate-bounce-slow">
                  <SittingFlora size={140} className="drop-shadow-sm" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{t.noEvents}</h3>
                <p className="text-[#7BA4A8] font-medium">享受平靜與安寧吧。</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  t={t}
                  onSave={handleSave}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
