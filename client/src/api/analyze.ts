export type RiskLevel = 'High' | 'Medium' | 'Low'
export type Language = 'en' | 'my'

export interface Clause {
  clauseType: string
  text: string
  riskLevel: RiskLevel
  explanation: string
  suggestion: string
}

export interface AnalysisResult {
  pageCount: number | null
  /** Language of summary, clauseType, explanation and suggestion. */
  language: Language
  summary: string
  clauses: Clause[]
  droppedClauseCount: number
}

interface ErrorBody {
  error?: string
}

export async function analyzeDocument(
  file: File,
  language: Language,
): Promise<AnalysisResult> {
  const body = new FormData()
  body.append('file', file)

  let res: Response
  try {
    res = await fetch(`/api/analyze?lang=${language}`, { method: 'POST', body })
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.')
  }
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as ErrorBody
    throw new Error(err.error ?? `Analysis failed (HTTP ${res.status})`)
  }
  return (await res.json()) as AnalysisResult
}
