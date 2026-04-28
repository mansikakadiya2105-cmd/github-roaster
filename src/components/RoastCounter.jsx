import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getRoastCount } from '../lib/supabase'

export default function RoastCounter() {
  const [count, setCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const realCount = await getRoastCount()
        setCount(realCount || 1248) // Fallback if needed
      } catch (e) {
        setCount(1248)
      }
    }
    fetchCount()
  }, [])

  useEffect(() => {
    if (count === 0) return
    const target = count
    const duration = 2000
    const startTime = performance.now()
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [count])

  return (
    <div className="font-mono text-[var(--muted)] flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[1.5rem] font-bold text-[var(--accent-2)]">
          {displayCount.toLocaleString()}
        </span>
        <span>developers destroyed so far</span>
      </div>
    </div>
  )
}
