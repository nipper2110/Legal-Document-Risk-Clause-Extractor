export type ErrorCode =
  | 'NO_FILE'
  | 'INVALID_REQUEST'
  | 'INVALID_FILE'
  | 'FILE_TOO_LARGE'
  | 'UNREADABLE_DOCUMENT'
  | 'EMPTY_TEXT'
  | 'TEXT_TOO_LONG'
  | 'RATE_LIMITED'
  | 'AI_NOT_CONFIGURED'
  | 'AI_RATE_LIMITED'
  | 'AI_UNAVAILABLE'
  | 'AI_BLOCKED'
  | 'AI_INVALID_RESPONSE'
  | 'INTERNAL_ERROR'

/** An error with an HTTP status and a message that is safe to show to users. */
export class AppError extends Error {
  readonly status: number
  readonly code: ErrorCode

  constructor(status: number, code: ErrorCode, message: string) {
    super(message)
    this.name = 'AppError'
    this.status = status
    this.code = code
  }
}
