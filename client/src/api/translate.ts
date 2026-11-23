import type { Language } from './analyze'

/** The AI-written parts of a result. Quoted clause text is never translated. */
export interface Localized {
  summary: string
  clauses: { clauseType: string; explanation: string; suggestion: string }[]
}

interface ErrorBody {
  error?: string
}

export async function translateResult(
  content: Localized,
  language: Language,
): Promise<Localized> {
  let res: Response
  try {
    res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, ...content }),
    })
  } catch {
    throw new Error('Could not reach the server.')
  }
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as ErrorBody
    throw new Error(err.error ?? `Translation failed (HTTP ${res.status})`)
  }
  return (await res.json()) as Localized
}
