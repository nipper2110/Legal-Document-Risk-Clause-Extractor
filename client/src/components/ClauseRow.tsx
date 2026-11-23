import type { Clause } from '../api/analyze'
import { formatClauseForCopy } from '../utils/clipboard'
import type { Labels } from '../utils/i18n'
import { RISK_STYLES } from '../utils/risk'
import CopyButton from './CopyButton'
import RiskLabel from './RiskLabel'

interface Props {
  clause: Clause
  number: number
  labels: Labels
}

function ClauseRow({ clause, number, labels }: Props) {
  return (
    <article className="grid gap-5 border-t border-charcoal-700 py-8 md:grid-cols-[200px_1fr] md:gap-10 print:break-inside-avoid">
      <div className="flex flex-col items-start gap-2">
        <span className="font-serif text-sm text-muted">
          {String(number).padStart(2, '0')}
        </span>
        <h3 className="font-serif text-2xl leading-tight text-paper">
          {clause.clauseType}
        </h3>
        <RiskLabel level={clause.riskLevel} labels={labels} />
        <div className="mt-2">
          <CopyButton
            getText={() => formatClauseForCopy(clause, labels)}
            labels={labels}
          />
        </div>
      </div>

      <div>
        <blockquote
          className={`whitespace-pre-line break-words border-l-2 pl-5 font-serif text-lg leading-relaxed text-paper ${RISK_STYLES[clause.riskLevel].bar}`}
        >
          {clause.text}
        </blockquote>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted">
              {labels.whyItMatters}
            </dt>
            <dd className="mt-2 text-paper/90">{clause.explanation}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted">
              {labels.suggestion}
            </dt>
            <dd className="mt-2 text-paper/90">{clause.suggestion}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

export default ClauseRow
