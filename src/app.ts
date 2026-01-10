import express, { Application } from "express";
import loginRoutes from "./routes/login.routes";

/**
 * Cria e configura a aplicação Express.
 * Separar isso permite testar o app sem subir o servidor.
 */
export function createApp(): Application {
  const app = express();

  // Middleware para parsing de JSON
  app.use(express.json());

  // Middleware para parsing de dados URL encoded
  app.use(express.urlencoded({ extended: true }));

  // Rotas
  app.use("/", loginRoutes);

  return app;
}
