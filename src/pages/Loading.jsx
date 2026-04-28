import { useEffect, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { fetchGitHubData } from "../lib/github"
import { generateRoast } from "../lib/groq"
import { saveRoast } from "../lib/supabase"

export default function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const username = location.state?.username
  const hasStarted = useRef(false)

  const [lines, setLines] = useState([])

  const terminalSequence = [
    { text: "✓ Connecting to GitHub servers...", type: "green" },
    { text: `✓ Fetching profile data for @${username}...`, type: "green" },
    { text: "⚡ Counting abandoned repositories...", type: "yellow" },
    { text: "✓ Analyzing commit messages for signs of life...", type: "green" },
    { text: "✗ Checking if README files exist... [spoiler: they don't]", type: "red" },
    { text: "⚡ Running shame detection algorithm...", type: "yellow" },
    { text: "✓ Calculating developer score...", type: "green" },
    { text: "⚡ Consulting the ancient coding gods...", type: "yellow" },
    { text: "✓ Preparing your destruction...", type: "green" },
    { text: "✓ Almost done cooking your roast...", type: "green" }
  ]

  useEffect(() => {
    if (!username) {
      navigate("/home")
      return
    }
    
    if (hasStarted.current) return
    hasStarted.current = true

    terminalSequence.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line])
      }, i * 350)
    })

    const runRoast = async () => {
      try {
        const githubData = await fetchGitHubData(username)
        const roastData = await generateRoast(githubData)
        
        await saveRoast(
          username,
          roastData.score,
          roastData.roast,
          githubData.topLanguages
        )
        
        setTimeout(() => {
          navigate("/results", {
            state: { githubData, roastData }
          })
        }, 4000)

      } catch (error) {
        console.error("Roast failed:", error)
        navigate("/home", {
          state: { error: error.message }
        })
      }
    }

    runRoast()
  }, [])

  const getIconColor = (text) => {
    if (text.startsWith('✓')) return 'var(--accent-3)'
    if (text.startsWith('✗')) return 'var(--accent-1)'
    if (text.startsWith('⚡')) return 'var(--accent-2)'
    return 'var(--primary)'
  }

  return (
    <div className="min-h-screen mesh-gradient flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[600px]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-label text-[var(--accent-3)] mb-4 block text-center"
        >
          ANALYZING @{username}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[16px] overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="h-[40px] bg-[var(--bg-3)] px-4 flex items-center gap-2 border-b border-[var(--card-border)]">
            <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
            <div className="w-3 h-3 rounded-full bg-[#ffd93d]" />
            <div className="w-3 h-3 rounded-full bg-[#6bcb77]" />
            <span className="ml-2 font-mono text-[0.75rem] text-[var(--muted)]">roast-engine v2.0.25</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 min-h-[280px] font-mono text-[0.875rem]">
            <AnimatePresence>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-[10px] flex gap-3 items-start"
                >
                  <span style={{ color: getIconColor(line.text) }}>
                    {line.text.charAt(0)}
                  </span>
                  <span className="text-[var(--primary)]">
                    {line.text.slice(2).split('[').map((part, idx) => (
                      idx === 0 ? part : <span key={idx} className="text-[var(--muted)]">[{part}</span>
                    ))}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-6 w-full h-1 bg-[var(--card-border)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
