import { TreePine } from 'lucide-react'
import FluffyCloud from './FluffyCloud'
import MoominCouple from './MoominCouple'

// Defined outside any parent component so React never remounts it on re-renders
export default function MoominBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <FluffyCloud size={150} opacity={0.6} className="absolute top-10 -left-10" />
      <FluffyCloud size={200} opacity={0.4} className="absolute top-32 right-10" />
      <FluffyCloud size={120} opacity={0.5} className="absolute bottom-40 left-1/4" />

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#E8F1F2] to-transparent" />

      <div className="absolute -bottom-2 right-10 text-[#819A71] opacity-30 flex items-end gap-4">
        <TreePine size={80}  strokeWidth={1.5} />
        <TreePine size={120} strokeWidth={1.5} className="mb-4" />
        <TreePine size={60}  strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-4 left-10 text-[#819A71] opacity-20 flex items-end gap-2">
        <TreePine size={100} strokeWidth={1.5} />
        <TreePine size={70}  strokeWidth={1.5} className="mb-2" />
      </div>

      <div className="absolute -bottom-5 left-10 sm:left-24 animate-pulse" style={{ animationDuration: '6s' }}>
        <MoominCouple size={180} className="drop-shadow-lg opacity-90 transition-opacity" />
      </div>
    </div>
  )
}
