import { rateLimit } from 'express-rate-limit'
import { AppError } from '../errors.js'

const WINDOW_MS = 15 * 60 * 1000

/**
 * Per-IP limiter for expensive AI endpoints. Each call gets its own counter.
 * If deployed behind a reverse proxy, set `app.set('trust proxy', ...)`
 * so req.ip is the real client and not the proxy.
 */
function createLimiter(limit: number) {
  return rateLimit({
    windowMs: WINDOW_MS,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(
        new AppError(
          429,
          'RATE_LIMITED',
          'Too many requests. Please wait a few minutes and try again.',
        ),
      )
    },
  })
}

export const analyzeRateLimit = createLimiter(
  Number(process.env.ANALYZE_RATE_LIMIT ?? 10),
)
export const translateRateLimit = createLimiter(
  Number(process.env.TRANSLATE_RATE_LIMIT ?? 30),
)
