import { Router } from 'express'
import { AppError } from '../errors.js'
import { uploadDocument } from '../middleware/upload.js'
import { extractText } from '../services/textExtractor.service.js'

export const extractRouter = Router()

extractRouter.post('/extract', uploadDocument, async (req, res) => {
  if (!req.file) {
    throw new AppError(400, 'NO_FILE', 'No file uploaded. Use form field "file".')
  }
  res.json(await extractText(req.file.buffer, req.file.mimetype))
})
