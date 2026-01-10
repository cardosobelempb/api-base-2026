import dotenv from "dotenv";
import { z } from "zod";

/**
 * Carrega e valida variáveis de ambiente
 * Falha rápido se algo estiver errado
 */
dotenv.config();

const envSchema = z.object({
  APP_PORT: z.coerce.number().default(8080),
  NODE_ENV: z.enum(["development", "test", "production"]),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DIALECT: z.string(),
});

/**
 * Validação centralizada
 */
export const env = envSchema.parse(process.env);
