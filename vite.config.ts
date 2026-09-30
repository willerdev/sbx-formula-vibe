import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleNowPayments } from "./server/payments.mjs";

const loadServerEnv = (mode: string) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
};

const attachNowPayments = (middlewares: { use: (handler: (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: () => void) => void) => void }, mode: string) => {
  loadServerEnv(mode);
  middlewares.use(async (req, res, next) => {
    if (!req.url?.startsWith("/api/nowpayments")) return next();
    try {
      await handleNowPayments(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Payment server error" }));
      }
    }
  });
};

const nowPaymentsDevPlugin = (): Plugin => ({
  name: "nowpayments-dev",
  configureServer(server) {
    attachNowPayments(server.middlewares, server.config.mode);
  },
  configurePreviewServer(server) {
    attachNowPayments(server.middlewares, server.config.mode);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    nowPaymentsDevPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
