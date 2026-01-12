/**
 * Erros genéricos do sistema
 */
export const GeneralErrors = {
  BAD_REQUEST: 'general.invalid-request.error',
  FORBIDDEN: 'general.action-forbidden.error',
  UNAUTHORIZED: 'general.unauthorized-access.error',
  ACCESS_DENIED: 'general.access-denied.error',
  METHOD_NOT_ALLOWED: 'general.method-not-allowed.error',
  NOT_ALLOWED: 'general.operation-not-allowed.error',
} as const
