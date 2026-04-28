import { forwardRef, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { useNavigate } from 'react-router-dom'

const ShareCard = forwardRef(({ githubData, roastData }, ref) => {
  const navigate = useNavigate()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const cardRef = useRef(null)
  
  const { username, avatar, publicRepos, totalStars, streak } = githubData
  const { score, level, oneLiner } = roastData
  const isLegendary = score >= 86

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * 12
    const tiltY = (x - 0.5) * -12
    setTilt({ x: tiltX, y: tiltY })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleShareX = () => {
    const tweet = `I got roasted by AI 💀 My GitHub score: ${score}/100\n"${oneLiner}"\n\nTry yours: githubroaster.vercel.app #GitHubRoaster #developer`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank')
  }

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://githubroaster.vercel.app')}`
    window.open(shareUrl, '_blank')
  }

  const handleShareInstagram = () => {
    window.open("https://www.instagram.com/", "_blank")
  }

  const handleDownload = () => {
    if (!cardRef.current) return Promise.resolve()
    return html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      width: 340,
      height: 480
    }).then(canvas => {
      const link = document.createElement('a')
      link.download = `github-roast-${username}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${oneLiner} - Score: ${score}/100`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const LegendaryCard = () => (
    <div
      style={{
        width: '340px',
        height: '480px',
        position: 'relative',
        background: 'linear-gradient(145deg, #c8860a, #e8a020, #f0b830, #e8a020, #c8860a)',
        clipPath: 'polygon(0% 8%, 6% 0%, 72% 0%, 72% 6%, 78% 6%, 78% 0%, 100% 0%, 100% 92%, 94% 100%, 0% 100%)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}
    >
      {/* Texture Overlay */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
        <defs>
          <pattern id="engrave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 Q10 10 20 20 Q30 30 40 20" stroke="#8B6000" strokeWidth="0.8" fill="none" />
            <path d="M0 10 Q10 0 20 10 Q30 20 40 10" stroke="#8B6000" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#engrave)" />
      </svg>

      {/* TOP LEFT - Score Display */}
      <div style={{ position: 'absolute', top: '12px', left: '14px', zIndex: 10 }}>
        <span style={{ display: 'block', fontFamily: 'serif', fontSize: '0.7rem', color: '#5a3a00', fontWeight: 'bold' }}>No.</span>
        <div style={{ fontFamily: 'Bangers, serif', fontSize: '2.2rem', color: '#5a3a00', lineHeight: 0.9, letterSpacing: '-1px' }}>
          {score}
        </div>
      </div>

      {/* CENTER - Aztec Face SVG */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '240px', height: '240px' }}>
        <svg viewBox="0 0 240 240" style={{ width: '100%', height: '100%' }}>
          {/* Outer sun rays */}
          <polygon points="120,20 130,50 110,50" fill="#5a3a00" opacity="0.7" />
          <polygon points="190,40 175,65 165,45" fill="#5a3a00" opacity="0.7" />
          <polygon points="220,120 190,115 190,125" fill="#5a3a00" opacity="0.7" />
          <polygon points="190,200 165,175 175,165" fill="#5a3a00" opacity="0.7" />
          <polygon points="120,230 110,200 130,200" fill="#5a3a00" opacity="0.7" />
          <polygon points="50,200 55,175 65,190" fill="#5a3a00" opacity="0.7" />
          <polygon points="20,120 50,125 50,115" fill="#5a3a00" opacity="0.7" />
          <polygon points="50,40 65,65 55,75" fill="#5a3a00" opacity="0.7" />

          {/* Main face circle */}
          <circle cx="120" cy="120" r="75" fill="none" stroke="#5a3a00" strokeWidth="3" opacity="0.8" />
          <circle cx="120" cy="120" r="65" fill="none" stroke="#5a3a00" strokeWidth="1" opacity="0.4" />

          {/* Face features */}
          <ellipse cx="95" cy="108" rx="12" ry="9" fill="none" stroke="#5a3a00" strokeWidth="2.5" />
          <ellipse cx="145" cy="108" rx="12" ry="9" fill="none" stroke="#5a3a00" strokeWidth="2.5" />
          <circle cx="95" cy="108" r="5" fill="#5a3a00" opacity="0.6" />
          <circle cx="145" cy="108" r="5" fill="#5a3a00" opacity="0.6" />

          <path d="M115 118 L120 110 L125 118 L120 122 Z" fill="#5a3a00" opacity="0.7" />

          <path d="M98 138 Q120 155 142 138" fill="none" stroke="#5a3a00" strokeWidth="3" />
          <path d="M98 138 Q120 148 142 138" fill="#5a3a00" opacity="0.3" />

          <path d="M105 88 L120 78 L135 88" fill="none" stroke="#5a3a00" strokeWidth="2" />
          <circle cx="120" cy="80" r="4" fill="#5a3a00" opacity="0.7" />

          <line x1="25" y1="115" x2="45" y2="115" stroke="#5a3a00" strokeWidth="2" />
          <line x1="25" y1="122" x2="45" y2="122" stroke="#5a3a00" strokeWidth="2" />
          <line x1="195" y1="115" x2="215" y2="115" stroke="#5a3a00" strokeWidth="2" />
          <line x1="195" y1="122" x2="215" y2="122" stroke="#5a3a00" strokeWidth="2" />

          <circle cx="44" cy="120" r="12" fill="none" stroke="#5a3a00" strokeWidth="2" />
          <circle cx="196" cy="120" r="12" fill="none" stroke="#5a3a00" strokeWidth="2" />

          <path d="M85 175 Q75 185 80 195 Q85 205 95 200" fill="none" stroke="#5a3a00" strokeWidth="2" />
          <path d="M155 175 Q165 185 160 195 Q155 205 145 200" fill="none" stroke="#5a3a00" strokeWidth="2" />

          <polygon points="30,220 20,240 40,240" fill="#5a3a00" opacity="0.6" />
          <polygon points="210,220 200,240 220,240" fill="#5a3a00" opacity="0.6" />

          <circle cx="70" cy="88" r="3" fill="#5a3a00" opacity="0.6" />
          <circle cx="170" cy="88" r="3" fill="#5a3a00" opacity="0.6" />
          <circle cx="60" cy="155" r="3" fill="#5a3a00" opacity="0.5" />
          <circle cx="180" cy="155" r="3" fill="#5a3a00" opacity="0.5" />
        </svg>
      </div>

      {/* ONE LINER - Carved text style */}
      <div style={{ position: 'absolute', bottom: '80px', width: '100%', padding: '0 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Bangers, cursive', fontSize: '1.2rem', color: '#5a3a00', opacity: 0.9, lineHeight: 1.2, margin: 0 }}>
          "{oneLiner}"
        </p>
      </div>

      {/* BOTTOM - User Info Strip */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(90, 58, 0, 0.3)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#5a3a00', fontWeight: 700 }}>
          @{username}
        </div>
        <div style={{ background: 'rgba(90, 58, 0, 0.3)', border: '1px solid #5a3a00', padding: '2px 8px', borderRadius: '4px', fontSize: '0.6rem', color: '#5a3a00', fontWeight: 'bold', letterSpacing: '1px' }}>
          LEGENDARY
        </div>
      </div>
    </div>
  )

  const StandardCard = () => (
    <div
      style={{
        width: '340px',
        height: '480px',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Decorative Accents */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 200, height: 200, background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -50, width: 150, height: 150, background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

      {/* Header */}
      <div style={{ padding: '24px 24px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6366f1', fontWeight: 700, letterSpacing: '2px', marginBottom: '4px' }}>COMMON CARD</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', color: 'white', fontWeight: 700 }}>@{username}</div>
        </div>
        <div style={{ width: 44, height: 44, background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bangers, cursive', fontSize: '1.2rem', color: 'white' }}>
          {score}
        </div>
      </div>

      {/* Avatar Area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ width: '100%', height: '180px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={avatar} alt={username} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid #1e293b', boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }} />
          <div style={{ position: 'absolute', bottom: 12, width: '100%', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>
            Lvl. {level.split(' ')[0]}
          </div>
        </div>
      </div>

      {/* Roast Quote */}
      <div style={{ padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bangers, cursive', fontSize: '1.1rem', color: 'white', opacity: 0.9, lineHeight: 1.4 }}>
          "{oneLiner}"
        </div>
      </div>

      {/* Stats Strip */}
      <div style={{ padding: '0 24px 24px', display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>REPOS</div>
          <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 700 }}>{publicRepos}</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>STARS</div>
          <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 700 }}>{totalStars}</div>
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>STREAK</div>
          <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 700 }}>{streak}d</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      <div
        ref={(node) => {
          cardRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '340px',
          height: '480px',
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered ? 'none' : 'transform 0.5s ease',
          cursor: 'none'
        }}
      >
        {isLegendary ? <LegendaryCard /> : <StandardCard />}
      </div>

      {/* BUTTONS BELOW CARD */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px', width: '340px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={handleShareX}
            style={{
              background: '#000000',
              color: 'white',
              height: '48px',
              borderRadius: '14px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#1a1a1a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#000000'; }}
          >
            Share on X 𝕏
          </button>
          <button
            onClick={handleShareLinkedIn}
            style={{
              background: '#0077b5',
              color: 'white',
              height: '48px',
              borderRadius: '14px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
          >
            LinkedIn 🔗
          </button>
        </div>

        <button
          onClick={handleShareInstagram}
          style={{
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            color: 'white',
            height: '48px',
            borderRadius: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
        >
          Post to Instagram 📸
        </button>

        <button
          onClick={handleDownload}
          style={{
            background: isLegendary ? '#e8a020' : '#6366f1',
            color: isLegendary ? '#5a3a00' : 'white',
            height: '48px',
            borderRadius: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
        >
          Download Card 📥
        </button>

        <button
          onClick={handleCopy}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            height: '48px',
            borderRadius: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            width: '100%',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        >
          {copied ? "Copied! ✓" : "Copy Roast Text 📋"}
        </button>

        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'white',
            border: 'none',
            color: '#0f172a',
            height: '48px',
            borderRadius: '14px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '0.95rem',
            width: '100%',
            cursor: 'pointer',
            marginTop: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(0.9)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
        >
          Back to Home 🏠
        </button>
      </div>
    </div>
  )
})

export default ShareCard
