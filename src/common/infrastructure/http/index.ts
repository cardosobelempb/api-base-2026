/**
 * Entry point da aplicação.
 * Responsável apenas por iniciar o servidor.
 */

import { AppDataSource } from '../typeorm'
import { startServer } from './server'

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized! 🚀')
  })
  .catch(error =>
    console.log('Error during Data Source initialization:', error),
  )

startServer()
