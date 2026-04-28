import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ScoreBadge({ score, level }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const target = score
    const duration = 1500
    const startTime = performance.now()
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [score])

  const getScoreColor = (s) => {
    if (s <= 40) return 'var(--accent-1)'
    if (s <= 70) return 'var(--accent-3)'
    return 'var(--accent-2)'
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="text-center"
    >
      <div 
        style={{ color: getScoreColor(score) }}
        className="text-[clamp(5rem,15vw,8rem)] font-bold leading-none mb-4 font-heading"
      >
        {animatedScore}
      </div>
      <div className="text-label text-[var(--muted)]">
        {level}
      </div>
    </motion.div>
  )
}
