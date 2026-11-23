import type { ErrorRequestHandler } from 'express'
import multer from 'multer'
import { AppError } from '../errors.js'

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err)
    return
  }
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message, code: err.code })
    return
  }
  if (err instanceof multer.MulterError) {
    const tooLarge = err.code === 'LIMIT_FILE_SIZE'
    res.status(tooLarge ? 413 : 400).json({
      error: tooLarge ? 'File exceeds the 10MB limit.' : 'Invalid file upload.',
      code: tooLarge ? 'FILE_TOO_LARGE' : 'INVALID_FILE',
    })
    return
  }
  console.error(err)
  res
    .status(500)
    .json({ error: 'Something went wrong on our side.', code: 'INTERNAL_ERROR' })
}
