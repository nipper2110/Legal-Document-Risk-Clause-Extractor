import type { Clause, RiskLevel } from '../api/analyze'

export const RISK_ORDER: RiskLevel[] = ['High', 'Medium', 'Low']

/** Classes are written out in full so Tailwind can see them. */
export const RISK_STYLES: Record<RiskLevel, { text: string; bar: string; dot: string }> = {
  High: { text: 'text-red-400', bar: 'border-red-400', dot: 'bg-red-400' },
  Medium: { text: 'text-yellow-400', bar: 'border-yellow-400', dot: 'bg-yellow-400' },
  Low: { text: 'text-green-400', bar: 'border-green-400', dot: 'bg-green-400' },
}

/** The highest risk level present, or null when no clauses were flagged. */
export function overallRisk(clauses: Clause[]): RiskLevel | null {
  return RISK_ORDER.find((l) => clauses.some((c) => c.riskLevel === l)) ?? null
}

export function sortByRisk(clauses: Clause[]): Clause[] {
  return [...clauses].sort(
    (a, b) => RISK_ORDER.indexOf(a.riskLevel) - RISK_ORDER.indexOf(b.riskLevel),
  )
}

export function countByRisk(clauses: Clause[]): Record<RiskLevel, number> {
  return {
    High: clauses.filter((c) => c.riskLevel === 'High').length,
    Medium: clauses.filter((c) => c.riskLevel === 'Medium').length,
    Low: clauses.filter((c) => c.riskLevel === 'Low').length,
  }
}
