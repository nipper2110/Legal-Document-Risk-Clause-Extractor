import FeatureGrid from './FeatureGrid'
import HowItWorks from './HowItWorks'
import LandingFooter from './LandingFooter'
import LandingHero from './LandingHero'

interface Props {
  onStart: () => void
}

function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen text-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="font-serif text-lg">Clause Extractor</span>
        <button
          type="button"
          onClick={onStart}
          className="text-sm text-muted underline-offset-4 hover:text-space-300 hover:underline"
        >
          Open analyzer
        </button>
      </header>
      <main>
        <LandingHero onStart={onStart} />
        <HowItWorks />
        <FeatureGrid />
      </main>
      <LandingFooter onStart={onStart} />
    </div>
  )
}

export default LandingPage
