import type { Labels } from '../utils/i18n'

interface Props {
  summary: string
  labels: Labels
}

function SummarySection({ summary, labels }: Props) {
  return (
    <section className="grid gap-4 border-b border-charcoal-700 py-8 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="text-xs uppercase tracking-widest text-muted">
        {labels.summary}
      </h2>
      <p className="max-w-3xl whitespace-pre-line font-serif text-xl leading-relaxed text-paper">
        {summary}
      </p>
    </section>
  )
}

export default SummarySection
