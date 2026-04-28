import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ThemeSelector = () => {
  const navigate = useNavigate()

  const handleEnter = () => {
    localStorage.setItem('roaster-visited', 'true')
    navigate('/home')
  }

  return (
    <div className="min-h-screen mesh-gradient flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-15, 15] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 3,
          ease: 'easeInOut',
        }}
        className="text-[4rem] mb-8 select-none"
      >
        💀
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="text-hero text-primary mb-4"
      >
        GitHub Roaster 💀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.1 }}
        className="text-muted text-[1.1rem] mb-12"
      >
        Enter. Get roasted. Survive.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.2 }}
        onClick={handleEnter}
        className="h-[60px] px-12 bg-[var(--accent-1)] text-white rounded-[16px] font-bold text-[1.1rem] transition-colors"
      >
        Enter the Arena
      </motion.button>
    </div>
  )
}

export default ThemeSelector
