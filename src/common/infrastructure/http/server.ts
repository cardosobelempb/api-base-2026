import { env } from '../env'
import { createApp } from './app'
import type { Server } from 'http'

/**
 * Inicia o servidor HTTP.
 * Retorna a instância do servidor para controle do ciclo de vida.
 */
function startServer(): Server {
  const port = Number(env.PORT)

  if (!port || Number.isNaN(port)) {
    throw new Error('[Server] Porta inválida ou não definida')
  }

  const app = createApp()

  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`📄 API docs available at GET /docs`)
  })

  server.on('error', error => {
    console.error('[Server] Erro ao iniciar servidor:', error)
    process.exit(1)
  })

  return server
}

export { startServer }
