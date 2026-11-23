import multer from 'multer'
import { AppError } from '../errors.js'
import {
  DOCX_MIME,
  JPEG_MIME,
  PDF_MIME,
  PNG_MIME,
} from '../services/textExtractor.service.js'

export const MAX_FILE_SIZE = 10 * 1024 * 1024

/** Single-file upload held in memory only; files are never written to disk. */
function createUpload(allowed: string[], message: string) {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE, files: 1, fields: 0, parts: 1 },
    fileFilter: (_req, file, cb) => {
      if (allowed.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new AppError(400, 'INVALID_FILE', message))
      }
    },
  }).single('file')
}

/** PDF and DOCX only (text extraction). */
export const uploadDocument = createUpload(
  [PDF_MIME, DOCX_MIME],
  'Only PDF and DOCX files are accepted.',
)

/** PDF, DOCX, PNG and JPEG (analysis). */
export const uploadAnalyzable = createUpload(
  [PDF_MIME, DOCX_MIME, PNG_MIME, JPEG_MIME],
  'Only PDF, DOCX, PNG and JPG files are accepted.',
)
