import { motion } from 'framer-motion'

export default function AdviceSection({ advice }) {
  if (!advice || advice.length === 0) {
    return (
      <div style={{ color: 'var(--primary)', padding: '20px' }}>
        <p>No advice available</p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {advice.map((item, index) => (
        <motion.div
          key={index}
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 260, damping: 28 }}
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            padding: '24px 0',
            borderBottom: index < advice.length - 1 ? '1px solid var(--card-border)' : 'none'
          }}
        >
          <div style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: 'var(--accent-1)',
            opacity: 0.4,
            flexShrink: 0,
            width: '56px',
            fontFamily: 'Space Grotesk, sans-serif',
            lineHeight: 1
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div style={{
            flex: 1,
            minWidth: 0,
            paddingTop: '8px'
          }}>
            <p style={{
              color: 'var(--primary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              margin: 0
            }}>
              {item}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
