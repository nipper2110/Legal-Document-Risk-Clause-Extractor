interface Props {
  onStart: () => void
}

function LandingHero({ onStart }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-36">
      <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-paper sm:text-7xl">
        Know what you&apos;re signing{' '}
        <span className="text-space-300">before you sign it.</span>
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted">
        Upload a contract and get every clause that matters, quoted exactly as
        written and rated for risk, with a note on what to push back on.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={onStart}
          className="rounded-lg bg-space-500 px-6 py-3 font-medium text-white hover:bg-space-400"
        >
          Analyze a document
        </button>
        <span className="text-sm text-muted">PDF, DOCX, PNG or JPG, up to 10MB</span>
      </div>
    </section>
  )
}

export default LandingHero
