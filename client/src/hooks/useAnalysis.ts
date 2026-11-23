import { useCallback, useState } from 'react'
import { analyzeDocument, type AnalysisResult, type Language } from '../api/analyze'

export type AnalysisState =
  | { status: 'idle' }
  | { status: 'loading'; fileName: string }
  | { status: 'done'; fileName: string; result: AnalysisResult }
  | { status: 'error'; message: string }

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({ status: 'idle' })

  const analyze = useCallback(async (file: File, language: Language) => {
    setState({ status: 'loading', fileName: file.name })
    try {
      const result = await analyzeDocument(file, language)
      setState({ status: 'done', fileName: file.name, result })
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Analysis failed.',
      })
    }
  }, [])

  const reset = useCallback(() => setState({ status: 'idle' }), [])

  return { state, analyze, reset }
}
