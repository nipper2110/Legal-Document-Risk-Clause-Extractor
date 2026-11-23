import { Router } from 'express'
import { AppError } from '../errors.js'
import { analyzeRateLimit } from '../middleware/rateLimit.js'
import { languageSchema } from '../schemas/analysis.schema.js'
import { uploadAnalyzable } from '../middleware/upload.js'
import { analyzeDocument } from '../services/gemini.service.js'
import { transcribeImage } from '../services/imageTranscriber.service.js'
import {
  assertValidImage,
  extractText,
  isImageMime,
  type ExtractedText,
} from '../services/textExtractor.service.js'

export const analyzeRouter = Router()

async function readFile(file: Express.Multer.File): Promise<ExtractedText> {
  if (isImageMime(file.mimetype)) {
    assertValidImage(file.buffer, file.mimetype)
    const text = await transcribeImage(file.buffer, file.mimetype)
    return { text, pageCount: 1 }
  }
  return extractText(file.buffer, file.mimetype)
}

analyzeRouter.post('/analyze', analyzeRateLimit, uploadAnalyzable, async (req, res) => {
  if (!req.file) {
    throw new AppError(400, 'NO_FILE', 'No file uploaded. Use form field "file".')
  }
  const language = languageSchema.safeParse(req.query.lang ?? 'en')
  if (!language.success) {
    throw new AppError(400, 'INVALID_REQUEST', 'Unsupported language. Use "en" or "my".')
  }
  const { text, pageCount } = await readFile(req.file)
  const analysis = await analyzeDocument(text, language.data)
  res.json({ pageCount, language: language.data, ...analysis })
})
