import express, { Router } from 'express'
import { AppError } from '../errors.js'
import { translateRateLimit } from '../middleware/rateLimit.js'
import { translateRequestSchema } from '../schemas/analysis.schema.js'
import { translateAnalysis } from '../services/translation.service.js'

export const translateRouter = Router()

translateRouter.post(
  '/translate',
  translateRateLimit,
  express.json({ limit: '300kb' }),
  async (req, res) => {
    const parsed = translateRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      throw new AppError(400, 'INVALID_REQUEST', 'Invalid translation request.')
    }
    const { language, ...content } = parsed.data
    res.json(await translateAnalysis(content, language))
  },
)
