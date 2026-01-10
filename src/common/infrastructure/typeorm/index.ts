import { DataSource, DataSourceOptions } from 'typeorm'
import { env } from '../env'

/**
 * Lista única de dialetos suportados.
 * Fonte da verdade (Single Source of Truth).
 */
const SUPPORTED_DATABASES = ['postgres', 'mysql', 'mariadb', 'mongodb'] as const

/**
 * Tipo derivado automaticamente da lista acima.
 */
type SupportedDatabase = (typeof SUPPORTED_DATABASES)[number]

/**
 * Resolve o dialeto do banco de forma segura.
 * Nunca retorna um valor inválido.
 */
function resolveDatabaseDialect(value: string | undefined): SupportedDatabase {
  if (value && SUPPORTED_DATABASES.includes(value as SupportedDatabase)) {
    return value as SupportedDatabase
  }

  return 'postgres'
}

const databaseType = resolveDatabaseDialect(env.DB_TYPE)

const dataSourceConfig: DataSourceOptions = {
  type: databaseType,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  schema: env.DB_SCHEMA,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['**/entities/**/*.ts'],
  subscribers: [],
  migrations: ['**/migrations/**/*.ts'],
  synchronize: false,
  logging: env.NODE_ENV === 'development',
}

export const AppDataSource = new DataSource(dataSourceConfig)
