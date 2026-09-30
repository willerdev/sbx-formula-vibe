import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleNowPayments } from "./server/payments.mjs";

const nowPaymentsDevPlugin = (): Plugin => ({
  name: "nowpayments-dev",
  configureServer(server) {
    const env = loadEnv(server.config.mode, process.cwd(), "");
    for (const [key, value] of Object.entries(env)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
    server.middlewares.use(async (req, res, next) => {
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
