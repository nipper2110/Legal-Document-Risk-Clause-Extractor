const NOTES = [
  {
    title: 'Scanned pages',
    body: 'PDFs that are only pictures of text cannot be read. Upload each page as a PNG or JPG instead.',
  },
  {
    title: 'One file at a time',
    body: 'PDF, DOCX, PNG or JPG, up to 10MB.',
  },
  {
    title: 'Not stored',
    body: 'Your file is processed in memory and never saved by this app.',
  },
]

function UploadIntro() {
  return (
    <div>
      <h1 className="font-serif text-4xl leading-tight text-paper sm:text-5xl">
        Upload a contract
        <span className="text-space-300"> to review.</span>
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">
        You&apos;ll get a summary and each important clause, quoted exactly and
        rated for risk.
      </p>
      <dl className="mt-10 max-w-md">
        {NOTES.map((note) => (
          <div key={note.title} className="border-t border-charcoal-700 py-4">
            <dt className="font-medium text-paper">{note.title}</dt>
            <dd className="mt-1 text-sm text-muted">{note.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default UploadIntro
