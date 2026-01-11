import { DataSource, DataSourceOptions } from 'typeorm'
import { env } from '../env'

/**
 * Dialetos suportados pelo projeto
 * Fonte única da verdade (Single Source of Truth)
 */
const SUPPORTED_DATABASES = ['postgres'] as const

type SupportedDatabase = (typeof SUPPORTED_DATABASES)[number]

/**
 * Resolve o tipo de banco garantindo fallback seguro
 */
function resolveDatabaseDialect(value: string | undefined): SupportedDatabase {
  if (SUPPORTED_DATABASES.includes(value as SupportedDatabase)) {
    return value as SupportedDatabase
  }

  return 'postgres'
}

/**
 * Validação explícita de variáveis críticas
 * Fail fast: erro cedo e claro
 */
function assertRequiredEnv(): void {
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
  ] as const

  for (const key of requiredEnvVars) {
    if (!env[key]) {
      throw new Error(
        `[DataSource] Variável de ambiente obrigatória ausente: ${key}`,
      )
    }
  }
}

assertRequiredEnv()

const databaseType = resolveDatabaseDialect(env.DB_TYPE)

/**
 * Detecta ambiente de execução
 * Evita misturar JS e TS em runtime
 */
const isProduction = env.NODE_ENV === 'production'

/**
 * Configuração do DataSource
 */
const dataSourceConfig: DataSourceOptions = {
  type: databaseType,

  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  schema: env.DB_SCHEMA,

  /**
   * ⚠️ IMPORTANTE
   * Em produção, carregamos apenas JS compilado
   * Em dev, apenas TS
   */
  entities: [
    isProduction ? 'dist/**/entities/**/*.js' : 'src/**/entities/**/*.ts',
  ],

  migrations: [
    isProduction ? 'dist/**/migrations/**/*.js' : 'src/**/migrations/**/*.ts',
  ],

  synchronize: false, // NUNCA usar true em produção
  logging: env.NODE_ENV === 'development',
}

export const dataSource = new DataSource(dataSourceConfig)
