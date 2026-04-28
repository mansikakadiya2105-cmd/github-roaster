import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import RoastText from '../components/RoastText'
import StatsSection from '../components/StatsSection'
import ScoreBadge from '../components/ScoreBadge'
import AdviceSection from '../components/AdviceSection'
import ActionButtons from '../components/ActionButtons'
import ShareCard from '../components/ShareCard'

const springConfig = { type: 'spring', stiffness: 260, damping: 28 }

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    if (!data || !data.githubData || !data.roastData) {
      navigate('/home', { replace: true })
      return
    }
    window.scrollTo(0, 0)
  }, [data, navigate])

  if (!data) return null

  const { githubData, roastData } = data

  const getScoreColor = (score) => {
    if (score <= 40) return '#ff6b6b' // Danger / Roast
    if (score < 86) return '#4d96ff'  // Standard / Good
    return '#f0b830'                  // Legendary / Gold
  }

  const adviceList = roastData?.advice || [
    "Add a README to your top repositories",
    "Make at least one commit per week",
    "Pin your best 6 projects on your profile"
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

      <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-32 pb-24 w-full">
        {/* Profile Header */}
        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div 
            animate={{ boxShadow: [`0 0 20px ${getScoreColor(roastData.score)}30`, `0 0 40px ${getScoreColor(roastData.score)}50`, `0 0 20px ${getScoreColor(roastData.score)}30`] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[100px] h-[100px] rounded-full border-[3px] border-[var(--accent-4)] overflow-hidden mb-6 shrink-0 shadow-lg"
            style={{ borderColor: getScoreColor(roastData.score) }}
          >
            <img src={githubData.avatar} alt={githubData.username} className="w-full h-full object-cover" />
          </motion.div>
          
          <h1 className="text-[2rem] font-bold mb-2 username-display max-w-full">@{githubData.username}</h1>
          <p className="text-[var(--muted)] italic text-overflow-fix">
            {githubData.accountAge} years of questionable decisions
          </p>
        </motion.section>

        {/* Score Section */}
        <section className="mb-20">
          <ScoreBadge score={roastData.score} level={roastData.level} />
        </section>

        {/* Roast Section */}
        <section className="mb-20">
          <span className="text-label text-[var(--accent-1)] mb-4 block">THE VERDICT 💀</span>
          <RoastText roast={roastData.roast} />
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <span className="text-label text-[var(--accent-4)] mb-8 block">DAMAGE REPORT 📊</span>
          <StatsSection data={githubData} />
        </section>

        {/* Advice Section */}
        <section className="mb-20">
          <span className="text-label text-[var(--accent-3)] mb-8 block">SURVIVAL GUIDE 🛠️</span>
          <AdviceSection advice={adviceList} />
        </section>

        {/* Action Buttons */}
        <section>
          <ActionButtons setShowShareModal={setShowShareModal} username={githubData.username} />
        </section>
      </main>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={springConfig}
              className="relative w-full max-w-[450px] z-10 flex flex-col items-center max-h-[95vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-0 right-4 text-white/50 hover:text-white text-2xl transition-colors p-2 z-20"
              >
                ✕
              </button>
              
              <div className="w-full flex flex-col items-center gap-8 py-8">
                <div className="scale-[0.8] sm:scale-100 origin-center shrink-0">
                  <ShareCard 
                    githubData={githubData}
                    roastData={roastData}
                  />
                </div>

                <div className="w-full px-8 mb-4">
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="w-full h-[52px] bg-white/5 border border-white/10 text-white rounded-[16px] font-semibold hover:bg-white/10 transition-colors"
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
