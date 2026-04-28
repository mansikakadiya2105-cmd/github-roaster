import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Cursor from './components/Cursor'

// Direct imports to avoid lazy loading issues
import ThemeSelector from './pages/ThemeSelector'
import Home from './pages/Home'
import Loading from './pages/Loading'
import Results from './pages/Results'

function App() {
  const isVisited = localStorage.getItem('roaster-visited') === 'true'

  useEffect(() => {
    const savedTheme = localStorage.getItem('roaster-theme') || 'light'
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Cursor />
      <Routes>
        <Route path="/" element={isVisited ? <Navigate to="/home" replace /> : <ThemeSelector />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
