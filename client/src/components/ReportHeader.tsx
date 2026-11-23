import type { AnalysisResult, Language } from '../api/analyze'
import type { Labels } from '../utils/i18n'
import { countByRisk, overallRisk, RISK_STYLES } from '../utils/risk'
import LanguageToggle from './LanguageToggle'

interface Props {
  result: AnalysisResult
  fileName: string
  labels: Labels
  language: Language
  onLanguage: (language: Language) => void
  translating: boolean
  onReset: () => void
}

function ReportHeader({
  result,
  fileName,
  labels,
  language,
  onLanguage,
  translating,
  onReset,
}: Props) {
  const overall = overallRisk(result.clauses)
  const counts = countByRisk(result.clauses)
  const pages = result.pageCount === null ? '' : labels.pages(result.pageCount)

  return (
    <header className="border-b border-charcoal-700 pb-8">
      <p className="truncate text-sm text-muted">
        {fileName}
        {pages}
      </p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            {labels.overallRisk}
          </p>
          <p
            className={`font-serif ${
              language === 'my'
                ? 'my-3 text-5xl leading-[1.7] sm:text-6xl'
                : 'text-6xl leading-tight sm:text-7xl'
            } ${overall ? RISK_STYLES[overall].text : 'text-muted'}`}
          >
            {overall ? labels.level[overall] : labels.noneFlagged}
          </p>
          <p className="mt-2 text-sm text-muted">
            {labels.counts(counts.High, counts.Medium, counts.Low)}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end print:hidden">
          <LanguageToggle
            value={language}
            onChange={onLanguage}
            disabled={translating}
          />
          {translating && <p className="text-sm text-muted">{labels.translating}</p>}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-space-500 px-4 py-2 text-sm font-medium text-white hover:bg-space-400"
            >
              {labels.exportPdf}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-charcoal-700 px-4 py-2 text-sm text-paper hover:bg-charcoal-800"
            >
              {labels.analyzeAnother}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ReportHeader
