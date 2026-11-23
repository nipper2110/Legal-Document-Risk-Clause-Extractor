import mammoth from 'mammoth'
import { PDFParse } from 'pdf-parse'
import { AppError } from '../errors.js'

export const PDF_MIME = 'application/pdf'
export const DOCX_MIME =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export const PNG_MIME = 'image/png'
export const JPEG_MIME = 'image/jpeg'

export const isImageMime = (mimetype: string): boolean =>
  mimetype === PNG_MIME || mimetype === JPEG_MIME

export interface ExtractedText {
  text: string
  /** Null for DOCX, which has no fixed page count. */
  pageCount: number | null
}

const invalidFile = (message: string): AppError =>
  new AppError(400, 'INVALID_FILE', message)

const unreadable = (): AppError =>
  new AppError(
    422,
    'UNREADABLE_DOCUMENT',
    'Could not read this document. It may be corrupted or password-protected.',
  )

const startsWith = (buffer: Buffer, signature: string): boolean =>
  buffer.subarray(0, signature.length).toString('latin1') === signature

/** Checks the file's leading bytes match the declared image type. */
export function assertValidImage(buffer: Buffer, mimetype: string): void {
  const isPng = buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))
  const isJpeg = buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
  if ((mimetype === PNG_MIME && !isPng) || (mimetype === JPEG_MIME && !isJpeg)) {
    throw invalidFile('File content is not a valid image.')
  }
}

export async function extractText(
  buffer: Buffer,
  mimetype: string,
): Promise<ExtractedText> {
  if (mimetype === PDF_MIME) {
    if (!startsWith(buffer, '%PDF')) {
      throw invalidFile('File content is not a valid PDF.')
    }
    const parser = new PDFParse({ data: new Uint8Array(buffer) })
    try {
      const result = await parser.getText({ pageJoiner: '\n' })
      return { text: result.text.trim(), pageCount: result.total }
    } catch (err) {
      console.error('PDF parse failed:', err)
      throw unreadable()
    } finally {
      await parser.destroy()
    }
  }

  if (mimetype === DOCX_MIME) {
    // DOCX is a zip archive, which begins with "PK".
    if (!startsWith(buffer, 'PK')) {
      throw invalidFile('File content is not a valid DOCX.')
    }
    try {
      const result = await mammoth.extractRawText({ buffer })
      return { text: result.value.trim(), pageCount: null }
    } catch (err) {
      console.error('DOCX parse failed:', err)
      throw unreadable()
    }
  }

  throw invalidFile('Only PDF and DOCX files can be read as text here.')
}
