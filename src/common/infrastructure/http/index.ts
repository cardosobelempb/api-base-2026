/**
 * Entry point da aplicação.
 * Responsável por inicializar dependências críticas
 * e iniciar o servidor apenas quando tudo estiver pronto.
 */

import { dataSource } from '../typeorm'
import { startServer } from './server'

async function bootstrap(): Promise<void> {
  try {
    console.log('Inicializando Data Source...')

    await dataSource.initialize()

    console.log('Data Source inicializado com sucesso! 🚀')

    startServer()
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error)

    // Encerra o processo com erro
    process.exit(1)
  }
}

bootstrap()
