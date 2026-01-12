import { StandardError } from '../standard-error.error'
import { ErrorCode } from './ErrorCode'

export class ConflictError extends StandardError {
  constructor(path: string) {
    super({
      error: 'ConflictError',
      message: ErrorCode.CONFLICT_ERROR,
      statusCode: 409,
      path,
    })
  }
}
