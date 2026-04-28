import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import RoastCounter from '../components/RoastCounter'

const springConfig = { type: 'spring', stiffness: 260, damping: 28 }

export default function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    navigate('/loading', { state: { username: username.trim() } })
  }

  const headingLine1 = "We Will Destroy"
  const headingLine2 = "Your GitHub Profile"

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const wordVariants = {
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: springConfig },
  }

  const examples = [
    { user: 'CodeNinja404', score: 12, emoji: '🥷', roast: '23 repos and the most recent commit was to fix a typo. In the README.', langs: ['JS', 'HTML', 'CSS'] },
    { user: 'DevGod_Real', score: 8, emoji: '🧙‍♂️', roast: 'Following 847 people hoping they follow back. This is LinkedIn behavior.', langs: ['Python', 'Go', 'Rust'] },
    { user: '10xEngineer', score: 34, emoji: '🚀', roast: 'Your entire tech stack is JavaScript frameworks you saw on Twitter.', langs: ['React', 'Vue', 'Svelte'] }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={springConfig}
      className="min-h-screen bg-[var(--bg)] text-[var(--primary)] flex flex-col overflow-x-hidden"
    >
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen mesh-gradient flex items-center justify-center pt-[72px] px-6">
          <div className="max-w-[1200px] w-full text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-label text-[var(--accent-3)] mb-6 block"
            >
              💀 AI-POWERED GITHUB DESTRUCTION
            </motion.span>

            <motion.h1
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="text-hero mb-8 flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-x-[0.3em]">
                {headingLine1.split(' ').map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-x-[0.3em] text-[var(--accent-1)]">
                {headingLine2.split(' ').map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-[var(--muted)] text-[1.2rem] mb-12 max-w-2xl mx-auto text-overflow-fix"
            >
              Lovingly. With data. And zero mercy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, ...springConfig }}
              className="max-w-[560px] mx-auto w-full"
            >
              <form 
                onSubmit={handleSubmit}
                className={`flex flex-col sm:flex-row gap-4 items-stretch ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
              >
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="GitHub Username"
                  className="flex-grow h-[64px] bg-[var(--card-bg)] border-[1.5px] border-[var(--card-border)] rounded-[16px] px-6 text-[1.1rem] text-[var(--primary)] focus:outline-none focus:border-[var(--accent-4)] focus:shadow-[0_0_0_4px_#4d96ff20] transition-all duration-300 font-heading min-w-0"
                />
                <button
                  type="submit"
                  className="h-[64px] sm:h-[64px] px-8 bg-[var(--accent-1)] text-white rounded-[14px] font-bold text-[1rem] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
                >
                  Roast Me 🔥
                </button>
              </form>

              <div className="mt-8">
                <RoastCounter />
              </div>
            </motion.div>

            {/* Preview Cards */}
            <div className="mt-20">
              <span className="text-label text-[var(--muted)] mb-8 block">SAMPLE DESTRUCTIONS</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {examples.map((ex, i) => (
                  <motion.div
                    key={ex.user}
                    animate={{ y: [-8, 8] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 3 + i * 0.5,
                      ease: "easeInOut"
                    }}
                    whileHover={{ y: -4, borderColor: 'var(--accent-4)' }}
                    className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[20px] p-7 transition-all duration-300 min-w-0 flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-6 gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{ex.emoji}</span>
                        <span className="font-bold text-[var(--primary)] username-display">@{ex.user}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider shrink-0 ${
                        ex.score > 70 ? 'bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/20' :
                        ex.score > 40 ? 'bg-[var(--accent-3)]/10 text-[var(--accent-3)] border border-[var(--accent-3)]/20' :
                        'bg-[var(--accent-1)]/10 text-[var(--accent-1)] border border-[var(--accent-1)]/20'
                      }`}>
                        Score: {ex.score}
                      </span>
                    </div>
                    <p className="text-[var(--muted)] italic leading-relaxed mb-6 text-overflow-fix">
                      "{ex.roast}"
                    </p>
                    <div className="flex gap-2 flex-wrap mt-auto">
                      {ex.langs.map(lang => (
                        <span key={lang} className="text-[0.65rem] px-2 py-0.5 rounded-md bg-[var(--bg-3)] text-[var(--muted)] uppercase font-mono">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-[var(--muted)] text-[0.875rem]">
        <p>Built with zero mercy and 100% free APIs 💀</p>
      </footer>
    </motion.div>
  )
}
