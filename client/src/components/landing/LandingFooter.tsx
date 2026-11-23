import Disclaimer from '../Disclaimer'

interface Props {
  onStart: () => void
}

function LandingFooter({ onStart }: Props) {
  return (
    <footer className="border-t border-charcoal-700">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-serif text-3xl text-paper">Ready when you are.</p>
          <button
            type="button"
            onClick={onStart}
            className="rounded-lg bg-space-500 px-6 py-3 font-medium text-white hover:bg-space-400"
          >
            Analyze a document
          </button>
        </div>
        <p className="mt-12 max-w-2xl text-sm text-muted">
          Your file is processed in memory and is not saved by this app. Its
          extracted text (or, for images, the image itself) is sent to
          Google&apos;s Gemini API for analysis.
        </p>
        <div className="mt-4 max-w-2xl">
          <Disclaimer />
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
