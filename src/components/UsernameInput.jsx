import { motion } from 'framer-motion'

export default function UsernameInput({ username, setUsername, onSubmit, isShaking }) {
  const isFocused = !!username || false

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-4">
      <motion.form 
        onSubmit={onSubmit}
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative group"
      >
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 bg-card border-2 border-color rounded-xl px-5 pt-3 text-lg font-inter focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition-all peer"
            placeholder=" "
          />
          <label 
            className={`absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-inter text-sm pointer-events-none transition-all duration-200 
            ${username ? '-translate-y-7 text-[10px] text-accent font-bold' : 'peer-focus:-translate-y-7 peer-focus:text-[10px] peer-focus:text-accent peer-focus:font-bold'}`}
          >
            GitHub Username
          </label>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full h-12 bg-accent text-white font-bangers text-xl rounded-full shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group overflow-hidden relative"
        >
          <span className="relative z-10">Roast Me 🔥</span>
          <motion.div 
            className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          />
        </motion.button>
      </motion.form>
    </div>
  )
}
