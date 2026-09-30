import { createServer } from "http";
import { createReadStream, existsSync, statSync } from "fs";
import { extname, join, normalize } from "path";
import { fileURLToPath } from "url";
import { handleNowPayments } from "./payments.mjs";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 8080);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const sendFile = (res, filePath) => {
  res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  if (url.pathname.startsWith("/api/nowpayments")) {
    try {
      await handleNowPayments(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Payment server error" }));
      }
    }
    return;
  }

  const requested = normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, requested);
  if (filePath.startsWith(root) && existsSync(filePath) && statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }

  const indexPath = join(root, "index.html");
  if (existsSync(indexPath)) {
    sendFile(res, indexPath);
    return;
  }

  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Build the site with npm run build before starting the server.");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Site and NOWPayments server listening on ${port}`);
});
