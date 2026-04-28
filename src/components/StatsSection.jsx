import { motion } from 'framer-motion'

export default function StatsSection({ data }) {
  const stats = [
    { label: 'Public Repos', value: data.publicRepos, emoji: '📦' },
    { label: 'Followers', value: data.followers, emoji: '👥' },
    { label: 'Total Stars', value: data.totalStars, emoji: '⭐' },
    { label: 'Longest Streak', value: `${data.streak}d`, emoji: '🔥' },
    { label: 'PRs (Last Year)', value: data.prs, emoji: '🔀' },
    { label: 'Total Commits', value: data.commits, emoji: '⌨️' }
  ]

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.07
      }
    }
  }

  const cardVariants = {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 28 } }
  }

  return (
    <div className="space-y-12">
      {/* Languages */}
      <div className="space-y-6">
        {data.topLanguages.map((lang, index) => (
          <div key={lang.name} className="space-y-2">
            <div className="flex justify-between text-[0.875rem] font-medium gap-4">
              <span className="text-[var(--primary)] truncate">{lang.name}</span>
              <span className="text-[var(--muted)] shrink-0">{lang.percentage}%</span>
            </div>
            <div className="h-[8px] bg-[var(--card-border)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-[var(--accent-4)] to-[var(--accent-3)] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 sm:gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ borderColor: 'var(--accent-4)', y: -2 }}
            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[16px] p-4 sm:p-5 transition-colors duration-300 min-w-0"
          >
            <div className="text-[1.25rem] sm:text-[1.5rem] mb-2">{stat.emoji}</div>
            <div className="text-[1.75rem] sm:text-[2.5rem] font-bold font-mono text-[var(--accent-2)] leading-none mb-2 stat-number">
              {stat.value}
            </div>
            <div className="text-label text-[var(--muted)] truncate">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
