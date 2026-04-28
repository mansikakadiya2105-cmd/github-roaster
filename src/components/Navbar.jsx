import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(
    localStorage.getItem("roaster-theme") || "light"
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("roaster-theme", newTheme)
  }

  return (
    <nav 
      className={`fixed top-0 left-0 w-full h-[72px] z-[90] flex items-center justify-between px-6 sm:px-12 transition-all duration-500 ${
        scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-[20px] border-b border-[var(--card-border)]' : 'bg-[rgba(0,0,0,0)]'
      }`}
    >
      <Link to="/home" className="flex items-center gap-3 group">
        <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">💀</span>
        <span className="font-heading font-bold text-[1.25rem] text-[var(--primary)] tracking-tight username-display">
          GitHub Roaster
        </span>
      </Link>

      <button
        onClick={toggleTheme}
        className="relative flex items-center outline-none focus:outline-none"
        style={{
          width: '52px',
          height: '28px',
          borderRadius: '99px',
          background: theme === 'dark' ? '#2a2a3d' : '#e0e0f0',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          border: 'none',
          padding: 0
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            position: 'absolute',
            top: '4px',
            left: 0,
            transform: theme === 'dark' ? 'translateX(4px)' : 'translateX(24px)',
            background: theme === 'dark' ? '#ffd93d' : '#4d96ff',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </button>
    </nav>
  )
}
