import { motion } from 'framer-motion'

export default function RoastText({ roast }) {
  const words = roast.split(' ')

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.03
      }
    }
  }

  const wordVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--accent-1)]/30 border-l-[4px] border-l-[var(--accent-1)] rounded-r-[16px] p-8 sm:p-10 shadow-xl roast-box">
      <motion.p
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-[1.15rem] leading-[1.8] text-[var(--primary)] flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] text-overflow-fix"
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordVariants}>
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  )
}
