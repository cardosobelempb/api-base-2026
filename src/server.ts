import { createApp } from "./app";
import { env } from "./config/env";

/**
 * Responsável por subir o servidor HTTP.
 */
export function startServer(): void {
  const app = createApp();

  const PORT: number = Number(env.APP_PORT) || 8080;

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
