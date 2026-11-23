import type { Clause } from '../api/analyze'
import type { Labels } from '../utils/i18n'
import { RISK_ORDER } from '../utils/risk'

export type Filter = 'All' | Clause['riskLevel']

interface Props {
  clauses: Clause[]
  value: Filter
  onChange: (filter: Filter) => void
  labels: Labels
}

const FILTERS: Filter[] = ['All', ...RISK_ORDER]

function ClauseFilter({ clauses, value, onChange, labels }: Props) {
  const count = (f: Filter) =>
    f === 'All' ? clauses.length : clauses.filter((c) => c.riskLevel === f).length

  return (
    <div role="group" aria-label="Filter clauses by risk" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          aria-pressed={value === f}
          onClick={() => onChange(f)}
          className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
            value === f
              ? 'border-space-500 bg-space-500 text-white'
              : 'border-charcoal-700 bg-transparent text-paper hover:border-space-400 hover:bg-charcoal-800'
          }`}
        >
          {f === 'All' ? labels.all : labels.level[f]} ({count(f)})
        </button>
      ))}
    </div>
  )
}

export default ClauseFilter
