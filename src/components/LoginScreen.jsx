import { Globe, Lock, User } from 'lucide-react'
import MoominBackground from './svgs/MoominBackground'
import MoominHouse from './svgs/MoominHouse'
import MoominCouple from './svgs/MoominCouple'

export default function LoginScreen({ lang, setLang, onLogin, loginError }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    onLogin(username, password)
  }

  return (
    <div className="min-h-screen bg-[#A8D0D6] flex flex-col justify-center items-center p-4 selection:bg-[#7BA4A8] selection:text-white relative overflow-hidden">
      <MoominBackground />

      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[2rem] shadow-2xl border-4 border-white w-full max-w-sm relative z-10 flex flex-col mt-10">
        <div className="flex justify-center items-end mb-6 gap-2">
          <MoominHouse size={70} className="drop-shadow-md" />
          <MoominCouple size={120} className="mb-2 drop-shadow-sm [transform:scaleX(-1)]" />
        </div>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-[#2C3E50] text-center tracking-wide">
            {lang === 'zh-TW' ? 'Canice 行程表' : lang === 'id' ? 'Jadwal Canice' : 'Canice Calendar Schedule'}
          </h1>
          <p className="text-[#7BA4A8] text-sm mt-2 font-medium">歡迎來到姆明谷 (Welcome to Moominvalley)</p>

          {/* Language selector on login screen */}
          <div className="flex items-center gap-2 bg-[#E8F1F2] px-3 py-1.5 rounded-full border border-white mt-3">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {loginError && (
            <div className="bg-[#FFF0F0] text-[#D2605A] px-4 py-3 rounded-2xl text-sm text-center border border-[#D2605A]/20 font-medium">
              {loginError}
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={18} className="text-[#7BA4A8] group-focus-within:text-[#2C3E50] transition-colors" />
            </div>
            <input
              name="username"
              type="text"
              placeholder="使用者名稱 Username"
              className="w-full pl-11 pr-4 py-3 bg-[#E8F1F2]/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7BA4A8] outline-none transition-all text-[#2C3E50]"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-[#7BA4A8] group-focus-within:text-[#2C3E50] transition-colors" />
            </div>
            <input
              name="password"
              type="password"
              placeholder="密碼 Password"
              className="w-full pl-11 pr-4 py-3 bg-[#E8F1F2]/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#7BA4A8] outline-none transition-all text-[#2C3E50]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#819A71] hover:bg-[#6D855E] text-white font-bold tracking-wide py-3.5 rounded-2xl transition-colors mt-2 shadow-lg shadow-[#819A71]/30"
          >
            進入山谷 (Enter the Valley)
          </button>
        </form>
      </div>
    </div>
  )
}
