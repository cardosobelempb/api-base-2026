/**
 * Erros relacionados ao domínio de usuário
 */
export const UserErrors = {
  USER_NOT_FOUND: 'user.not-found.error',
  USER_ALREADY_EXISTS: 'user.already-exists.error',
  INVALID_USER_DATA: 'user.invalid-data.error',
  INVALID_CREDENTIALS: 'user.invalid-credentials.error',
  INVALID_TOKEN: 'user.invalid-token.error',
  INVALID_AUTH: 'user.invalid-authentication.error',
  EMAIL_NOT_FOUND: 'user.email-not-found.error',
} as const
