import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ActionButtons({ setShowShareModal, username }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 w-full max-w-[600px] mx-auto">
      <motion.button
        whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowShareModal(true)}
        className="w-full h-[64px] bg-[var(--accent-1)] text-white rounded-[16px] font-bold text-[1.1rem] font-heading shadow-[0_8px_30px_#ff6b6b40] transition-all"
      >
        Share Your Roast 🔥
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02, filter: 'brightness(0.95)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/home')}
        className="w-full h-[60px] bg-white text-[#0f172a] rounded-[16px] font-bold text-[1rem] font-heading shadow-lg transition-all"
      >
        Back to Home 🏠
      </motion.button>

      <div className="grid grid-cols-3 gap-4">
        <motion.button
          whileHover={{ borderColor: 'var(--accent-4)', color: 'var(--accent-4)' }}
          onClick={() => navigate('/home')}
          className="h-[52px] bg-transparent border border-[var(--card-border)] text-[var(--primary)] rounded-[12px] font-semibold text-[0.95rem] font-heading transition-all"
        >
          Roast a Friend 👀
        </motion.button>
        
        <motion.button
          whileHover={{ borderColor: 'var(--accent-4)', color: 'var(--accent-4)' }}
          onClick={() => navigate('/home')}
          className="h-[52px] bg-transparent border border-[var(--card-border)] text-[var(--primary)] rounded-[12px] font-semibold text-[0.95rem] font-heading transition-all"
        >
          Roast Me Again 🎲
        </motion.button>

        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[52px] bg-transparent border border-[var(--card-border)] text-[var(--primary)] rounded-[12px] font-semibold text-[0.95rem] font-heading flex items-center justify-center hover:border-[var(--accent-4)] hover:text-[var(--accent-4)] transition-all"
        >
          View GitHub 🐙
        </motion.a>
      </div>
    </div>
  )
}
