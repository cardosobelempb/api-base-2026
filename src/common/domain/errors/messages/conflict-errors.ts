/**
 * Erros de conflito e integridade
 */
export const ConflictErrors = {
  CONFLICT: 'conflict.operation-conflict.error',
  DUPLICATE_RECORD: 'conflict.duplicate-record.error',
  INTEGRITY_VIOLATION: 'conflict.integrity-violation.error',
  DATA_INTEGRITY_VIOLATION: 'conflict.data-integrity-violation.error',
} as const
