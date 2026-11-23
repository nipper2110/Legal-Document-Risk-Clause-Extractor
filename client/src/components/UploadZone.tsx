import { useCallback, useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'

const MAX_SIZE = 10 * 1024 * 1024

const ACCEPT = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
}

interface Props {
  onFile: (file: File) => void
  /** Error from a previous analysis attempt, shown under the drop area. */
  error?: string | null
}

function UploadZone({ onFile, error }: Props) {
  const [rejection, setRejection] = useState<string | null>(null)

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length > 0) {
        const code = rejected[0].errors[0]?.code
        setRejection(
          code === 'file-too-large'
            ? 'File exceeds the 10MB limit.'
            : 'Only PDF, DOCX, PNG and JPG files are accepted.',
        )
        return
      }
      setRejection(null)
      if (accepted[0]) onFile(accepted[0])
    },
    [onFile],
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxSize: MAX_SIZE,
    multiple: false,
    noClick: true,
    noKeyboard: true,
  })

  const message = rejection ?? error

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        {...getRootProps()}
        className={`flex min-h-80 flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          isDragActive
            ? 'border-space-400 bg-space-500/10'
            : 'border-charcoal-700 bg-charcoal-800/60'
        }`}
      >
        <input {...getInputProps()} />
        <p className="font-serif text-2xl text-paper">
          {isDragActive ? 'Drop it here' : 'Drop your file here'}
        </p>
        <p className="mt-2 text-muted">or</p>
        <button
          type="button"
          onClick={open}
          className="mt-4 rounded-lg bg-space-500 px-6 py-3 font-medium text-white hover:bg-space-400"
        >
          Choose a file
        </button>
        <p className="mt-6 text-sm tracking-wide text-muted">
          PDF · DOCX · PNG · JPG &nbsp;|&nbsp; max 10MB
        </p>
      </div>
      {message && (
        <p role="alert" className="text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  )
}

export default UploadZone
