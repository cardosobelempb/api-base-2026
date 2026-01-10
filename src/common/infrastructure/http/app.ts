import cors from 'cors'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerJSDoc from 'swagger-jsdoc'
import { erroHandler } from './middlewares/errorHandler'
import { router } from './routes'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documntation',
      version: '1.0.0',
    },
  },
  apis: [],
}

function createApp(): Application {
  const swaggerSpec = swaggerJSDoc(options)

  const app = express()

  app.use(cors())

  // Middleware para parsing de JSON
  app.use(express.json())

  // Middleware para parsing de dados URL encoded
  app.use(express.urlencoded({ extended: true }))

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use(router)
  app.use(erroHandler)

  return app
}

export { createApp }
