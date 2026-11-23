import type { Clause } from '../api/analyze'
import type { Labels } from './i18n'

export function formatClauseForCopy(clause: Clause, labels: Labels): string {
  return [
    `${clause.clauseType} (${labels.levelRisk[clause.riskLevel]})`,
    '',
    `"${clause.text}"`,
    '',
    `${labels.whyItMatters}: ${clause.explanation}`,
    '',
    `${labels.suggestion}: ${clause.suggestion}`,
  ].join('\n')
}

/** Returns true when the text was copied. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
