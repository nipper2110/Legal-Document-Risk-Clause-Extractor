const FEATURES = [
  {
    title: 'Exact quotes only',
    body: 'Every clause is quoted word for word. Anything that cannot be found in your document is discarded.',
  },
  {
    title: 'Three risk levels',
    body: 'High, Medium and Low, so you know which clauses to read first.',
  },
  {
    title: 'Plain-language notes',
    body: 'Each flagged clause explains why it matters and what you could ask to change.',
  },
  {
    title: 'A short summary',
    body: 'A brief overview of the whole document, before you get into the detail.',
  },
]

function FeatureGrid() {
  return (
    <section className="border-t border-charcoal-700">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl text-paper">What you get</h2>
        <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-t border-charcoal-700 py-6">
              <dt className="font-medium text-paper">{f.title}</dt>
              <dd className="mt-1 text-muted">{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default FeatureGrid
