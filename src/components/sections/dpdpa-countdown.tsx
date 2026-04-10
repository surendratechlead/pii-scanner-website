'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const DEADLINE = new Date('2027-05-13T00:00:00+05:30').getTime()

function getRemaining() {
  const diff = DEADLINE - Date.now()
  if (diff <= 0) return null
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { d, h, m, s }
}

export function DPDPAcountdown() {
  const [left, setLeft] = useState<{ d: number; h: number; m: number; s: number } | null | undefined>(undefined)

  useEffect(() => {
    const tick = () => setLeft(getRemaining())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (left === undefined) return null
  if (left === null) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-red-600/90 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg shadow-red-500/20 border border-red-400/20 text-xs font-bold animate-pulse">
        Deadline Passed
      </div>
    )
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-slate-900/90 backdrop-blur-md border border-red-500/30 rounded-xl shadow-lg shadow-red-500/10 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-600/90 to-red-700/90">
        <Clock className="w-3 h-3 text-red-200" />
        <span className="text-[10px] font-bold tracking-wider text-red-100 uppercase">
          DPDPA Deadline
        </span>
      </div>
      <div className="flex items-center gap-1 px-3 py-2">
        {[
          { v: left.d, l: 'D' },
          { v: left.h, l: 'H' },
          { v: left.m, l: 'M' },
          { v: left.s, l: 'S' },
        ].map((u, i) => (
          <div key={u.l} className="flex items-center gap-1">
            <div className="bg-white/10 rounded px-1.5 py-0.5 min-w-[28px] text-center">
              <span className="text-sm font-black tabular-nums text-white">
                {String(u.v).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[9px] font-bold text-slate-400">{u.l}</span>
            {i < 3 && <span className="text-slate-600 text-xs mx-0.5">:</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
