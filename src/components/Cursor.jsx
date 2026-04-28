import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const Cursor = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 100 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleHover = (e) => {
      const target = e.target
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [mouseX, mouseY])

  if (isMobile) return null

  return (
    <>
      {/* Small dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-1)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      
      {/* Large ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? 'rgba(255, 217, 61, 0.2)' : 'rgba(0,0,0,0)',
          borderColor: isHovered ? 'rgba(0,0,0,0)' : 'var(--accent-2)',
          borderWidth: isHovered ? '0px' : '1.5px',
          borderStyle: 'solid'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}

export default Cursor
