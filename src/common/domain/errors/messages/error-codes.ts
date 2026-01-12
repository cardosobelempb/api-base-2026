import { ConflictErrors } from './conflict-errors'
import { GeneralErrors } from './general-errors'
import { UserErrors } from './user-errors'
import { ValidationErrors } from './validation-errors'

/**
 * Catálogo unificado de códigos de erro
 * Pode ser usado por controllers, services e middlewares
 */
export const ErrorCodes = {
  ...GeneralErrors,
  ...UserErrors,
  ...ValidationErrors,
  ...ConflictErrors,
} as const

/**
 * Tipo forte contendo todos os códigos possíveis
 */
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]
