import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'

/**
 * Configuração do Swagger (OpenAPI)
 * Mantida isolada para facilitar manutenção e versionamento
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },

  /**
   * Arquivos que contêm anotações Swagger
   * Ajuste conforme estrutura do projeto
   */
  apis: ['src/routes/**/*.ts'],
}

/**
 * Cria e configura a aplicação Express
 */
function createApp(): Application {
  const app = express()

  /**
   * Segurança básica
   */
  app.use(helmet())

  /**
   * CORS com configuração explícita
   * (evita comportamento inesperado em produção)
   */
  app.use(
    cors({
      origin: '*', // ajuste para domínios específicos
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }),
  )

  /**
   * Parsing de requisições
   */
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  /**
   * Documentação da API
   */
  const swaggerSpec = swaggerJSDoc(swaggerOptions)

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  /**
   * Rotas da aplicação
   */
  app.use(router)

  /**
   * Middleware global de tratamento de erros
   * Deve ser o ÚLTIMO middleware
   */
  app.use(errorHandler)

  return app
}

export { createApp }
