import { useState } from 'react'
import type { Language } from '../api/analyze'
import LanguageToggle from '../components/LanguageToggle'
import LoadingSteps from '../components/LoadingSteps'
import ResultsPage from '../components/ResultsPage'
import UploadIntro from '../components/UploadIntro'
import UploadZone from '../components/UploadZone'
import { useAnalysis } from '../hooks/useAnalysis'

interface Props {
  onBack: () => void
}

function AnalyzerPage({ onBack }: Props) {
  const { state, analyze, reset } = useAnalysis()
  const [language, setLanguage] = useState<Language>('en')
  const waitingForFile = state.status === 'idle' || state.status === 'error'

  return (
    <div className="min-h-screen text-paper print:bg-white print:text-black">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 print:hidden">
        <span className="font-serif text-lg">Clause Extractor</span>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted underline-offset-4 hover:text-space-300 hover:underline"
        >
          ← Home
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:pt-16">
        {waitingForFile && (
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
            <UploadIntro />
            <div className="flex flex-col gap-5">
              <LanguageToggle
                value={language}
                onChange={setLanguage}
                label="Report language"
              />
              <UploadZone
                onFile={(file) => analyze(file, language)}
                error={state.status === 'error' ? state.message : null}
              />
            </div>
          </div>
        )}
        {state.status === 'loading' && (
          <div className="mx-auto max-w-md">
            <LoadingSteps fileName={state.fileName} />
          </div>
        )}
        {state.status === 'done' && (
          <div className="mx-auto max-w-5xl">
            <ResultsPage
              result={state.result}
              fileName={state.fileName}
              onReset={reset}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default AnalyzerPage
