const STEPS = [
  {
    title: 'Upload',
    body: 'Drop in a PDF, Word file, or a photo or screenshot of a page. The text is read from it.',
  },
  {
    title: 'Review',
    body: 'Key clauses are found, quoted word for word, and rated High, Medium or Low.',
  },
  {
    title: 'Act',
    body: 'Filter by risk, copy a clause into an email, or save the whole report as a PDF.',
  },
]

function HowItWorks() {
  return (
    <section className="border-t border-charcoal-700">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl text-paper">How it works</h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="font-serif text-5xl text-space-400/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-lg font-medium text-paper">{step.title}</h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
