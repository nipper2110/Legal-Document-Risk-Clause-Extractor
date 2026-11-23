import type { Language } from '../api/analyze'

interface Props {
  value: Language
  onChange: (language: Language) => void
  disabled?: boolean
  label?: string
}

const OPTIONS: { value: Language; text: string }[] = [
  { value: 'en', text: 'English' },
  { value: 'my', text: 'မြန်မာ' },
]

function LanguageToggle({ value, onChange, disabled, label }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      {label && <span className="text-sm text-muted">{label}</span>}
      <div role="group" aria-label="Language" className="flex gap-2">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            disabled={disabled}
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
              value === o.value
                ? 'border-space-500 bg-space-500 text-white'
                : 'border-charcoal-700 text-paper hover:border-space-400'
            }`}
          >
            <span lang={o.value}>{o.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageToggle
