import { env } from '../env'
import { createApp } from './app'

/**
 * Responsável por subir o servidor HTTP.
 */
function startServer(): void {
  const app = createApp()

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT} ⚡`)
    console.log(`API docs avalible at GET/docs 📄`)
  })
}

export { startServer }
