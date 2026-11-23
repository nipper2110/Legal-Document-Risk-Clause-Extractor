import type { RiskLevel } from '../api/analyze'
import type { Labels } from '../utils/i18n'
import { RISK_STYLES } from '../utils/risk'

interface Props {
  level: RiskLevel
  labels: Labels
}

function RiskLabel({ level, labels }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${RISK_STYLES[level].text}`}
    >
      <span className={`h-2 w-2 ${RISK_STYLES[level].dot}`} aria-hidden />
      {labels.levelRisk[level]}
    </span>
  )
}

export default RiskLabel
