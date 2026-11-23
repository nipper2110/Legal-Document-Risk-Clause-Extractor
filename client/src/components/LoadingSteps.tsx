import { useEffect, useState } from 'react'

const STEPS = [
  { label: 'Reading document...', startsAtMs: 0 },
  { label: 'Analyzing clauses...', startsAtMs: 2500 },
  { label: 'Assessing risk levels...', startsAtMs: 8000 },
]

interface Props {
  fileName: string
}

/** Progress is estimated from elapsed time: the server reports no real progress. */
function LoadingSteps({ fileName }: Props) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timers = STEPS.slice(1).map((step, i) =>
      setTimeout(() => setActive(i + 1), step.startsAtMs),
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800/60 p-6"
    >
      <p className="mb-4 truncate text-sm text-muted">{fileName}</p>
      <ol className="space-y-3">
        {STEPS.map((step, i) => (
          <li
            key={step.label}
            className={`flex items-center gap-3 ${i > active ? 'text-charcoal-700' : 'text-paper'}`}
          >
            {i < active ? (
              <span className="text-space-300" aria-hidden>✓</span>
            ) : i === active ? (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal-700 border-t-space-300"
                aria-hidden
              />
            ) : (
              <span className="h-4 w-4 rounded-full border-2 border-charcoal-700" aria-hidden />
            )}
            {step.label}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default LoadingSteps
