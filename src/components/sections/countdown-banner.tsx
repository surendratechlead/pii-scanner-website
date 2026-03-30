'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'

const TARGET_DATE = new Date('2027-05-13T00:00:00+05:30')

interface TimeLeft {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = TARGET_DATE.getTime() - now.getTime()

  if (diff <= 0) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  const months = Math.floor(totalDays / 30.44)
  const days = Math.floor(totalDays % 30.44)
  const hours = totalHours % 24
  const minutes = totalMinutes % 60
  const seconds = totalSeconds % 60

  return { months, days, hours, minutes, seconds }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/15 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-1.5 min-w-[40px] md:min-w-[52px] text-center border border-white/20">
        <span className="text-lg md:text-2xl lg:text-3xl font-bold tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[9px] md:text-[10px] uppercase tracking-wider mt-1 opacity-80">{label}</span>
    </div>
  )
}

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const update = () => {
      const tl = calculateTimeLeft()
      setTimeLeft(tl)
      if (tl.months === 0 && tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsExpired(true)
      }
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeLeft) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-16 md:top-[72px] left-0 right-0 z-40 bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]" />

      <div className="container mx-auto px-4 py-2.5 md:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            {isExpired ? (
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            ) : (
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
            )}
            <span className="text-sm md:text-base font-bold tracking-wide">
              {isExpired ? 'DPDP Compliance Deadline Has Passed!' : 'DPDP Clock is Ticking'}
            </span>
          </div>

          {!isExpired && (
            <>
              <div className="flex items-center gap-1.5 md:gap-2">
                <TimeUnit value={timeLeft.months} label="Months" />
                <span className="text-lg md:text-xl font-bold opacity-60 self-start mt-1 md:mt-1.5">:</span>
                <TimeUnit value={timeLeft.days} label="Days" />
                <span className="text-lg md:text-xl font-bold opacity-60 self-start mt-1 md:mt-1.5">:</span>
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <span className="text-lg md:text-xl font-bold opacity-60 self-start mt-1 md:mt-1.5">:</span>
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <span className="text-lg md:text-xl font-bold opacity-60 self-start mt-1 md:mt-1.5">:</span>
                <TimeUnit value={timeLeft.seconds} label="Sec" />
              </div>

              <span className="text-xs md:text-sm opacity-80 font-medium">
                May 13, 2027
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
