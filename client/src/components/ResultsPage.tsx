import { useMemo, useState } from 'react'
import type { AnalysisResult, Clause } from '../api/analyze'
import { useLocalizedResult } from '../hooks/useLocalizedResult'
import { LABELS } from '../utils/i18n'
import { sortByRisk } from '../utils/risk'
import ClauseFilter, { type Filter } from './ClauseFilter'
import ClauseRow from './ClauseRow'
import Disclaimer from './Disclaimer'
import ReportHeader from './ReportHeader'
import SummarySection from './SummarySection'

interface Props {
  result: AnalysisResult
  fileName: string
  onReset: () => void
}

function ResultsPage({ result, fileName, onReset }: Props) {
  const [filter, setFilter] = useState<Filter>('All')
  const { language, view, select, loading, error } = useLocalizedResult(result)
  const labels = LABELS[language]

  // Quotes and risk levels come from the original result; the AI-written
  // fields come from the selected language. Numbers stay fixed when filtering.
  const numbered = useMemo(() => {
    const merged: Clause[] = result.clauses.map((c, i) => ({
      ...c,
      ...view.clauses[i],
    }))
    return sortByRisk(merged).map((clause, i) => ({ clause, number: i + 1 }))
  }, [result.clauses, view])

  const visible =
    filter === 'All' ? numbered : numbered.filter((n) => n.clause.riskLevel === filter)

  return (
    <div className="w-full" lang={language}>
      <ReportHeader
        result={result}
        fileName={fileName}
        labels={labels}
        language={language}
        onLanguage={select}
        translating={loading}
        onReset={onReset}
      />
      {error && (
        <p role="alert" className="pt-4 text-sm text-red-400 print:hidden">
          {error}
        </p>
      )}
      <SummarySection summary={view.summary} labels={labels} />

      <section className="pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 print:hidden">
          <ClauseFilter
            clauses={result.clauses}
            value={filter}
            onChange={setFilter}
            labels={labels}
          />
          {result.droppedClauseCount > 0 && (
            <p className="max-w-sm text-sm text-muted">
              {labels.omitted(result.droppedClauseCount)}
            </p>
          )}
        </div>

        {visible.map(({ clause, number }) => (
          <ClauseRow key={number} clause={clause} number={number} labels={labels} />
        ))}
        {visible.length === 0 && (
          <p className="border-t border-charcoal-700 py-10 text-muted">
            {labels.noClauses}
          </p>
        )}
      </section>

      <div className="border-t border-charcoal-700 pt-8">
        <Disclaimer language={language} />
      </div>
    </div>
  )
}

export default ResultsPage
