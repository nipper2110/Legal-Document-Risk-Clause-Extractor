import { useEffect, useState } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import type { Labels } from '../utils/i18n'

interface Props {
  getText: () => string
  labels: Labels
}

type Status = 'idle' | 'copied' | 'failed'

function CopyButton({ getText, labels }: Props) {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 2000)
    return () => clearTimeout(timer)
  }, [status])

  const onClick = async () => {
    setStatus((await copyToClipboard(getText())) ? 'copied' : 'failed')
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-charcoal-700 px-3 py-1 text-xs font-medium text-muted hover:border-space-400 hover:text-paper print:hidden"
    >
      <span aria-live="polite">
        {status === 'copied'
          ? labels.copied
          : status === 'failed'
            ? labels.copyFailed
            : labels.copy}
      </span>
    </button>
  )
}

export default CopyButton
