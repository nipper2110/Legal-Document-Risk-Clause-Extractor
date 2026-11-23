import { useCallback, useMemo, useState } from 'react'
import type { AnalysisResult, Language } from '../api/analyze'
import { translateResult, type Localized } from '../api/translate'

/**
 * Holds the language shown for a result. The language it was analyzed in is
 * free; the other one is translated on first use and then cached.
 */
export function useLocalizedResult(result: AnalysisResult) {
  const base = useMemo<Localized>(
    () => ({
      summary: result.summary,
      clauses: result.clauses.map((c) => ({
        clauseType: c.clauseType,
        explanation: c.explanation,
        suggestion: c.suggestion,
      })),
    }),
    [result],
  )

  const [cache, setCache] = useState<Partial<Record<Language, Localized>>>({
    [result.language]: base,
  })
  const [language, setLanguage] = useState<Language>(result.language)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const select = useCallback(
    async (next: Language) => {
      setError(null)
      if (cache[next]) {
        setLanguage(next)
        return
      }
      setLoading(true)
      try {
        const translated = await translateResult(base, next)
        setCache((c) => ({ ...c, [next]: translated }))
        setLanguage(next)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Translation failed.')
      } finally {
        setLoading(false)
      }
    },
    [base, cache],
  )

  return { language, view: cache[language] ?? base, select, loading, error }
}
