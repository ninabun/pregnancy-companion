import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml" };

createServer(async (request, response) => {
  const requested = request.url === "/" ? "/index.html" : request.url.split("?")[0];
  const path = normalize(join(process.cwd(), requested));
  if (!path.startsWith(process.cwd())) { response.writeHead(403).end("Forbidden"); return; }
  try {
    const body = await readFile(path);
    response.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Antenatal Companion running at http://127.0.0.1:${port}`));
