import { useState } from 'react'
import LandingPage from './components/landing/LandingPage'
import AnalyzerPage from './pages/AnalyzerPage'

type View = 'landing' | 'analyzer'

function App() {
  const [view, setView] = useState<View>('landing')

  return view === 'landing' ? (
    <LandingPage onStart={() => setView('analyzer')} />
  ) : (
    <AnalyzerPage onBack={() => setView('landing')} />
  )
}

export default App
