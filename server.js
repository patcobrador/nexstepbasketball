const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const logDir = path.join(root, ".logs");
const portFile = path.join(logDir, "server-url.txt");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function resolveRequest(url) {
  const parsed = new URL(url, "http://127.0.0.1");
  const requested = parsed.pathname === "/" ? "/index.html" : parsed.pathname;
  const filePath = path.normalize(path.join(root, decodeURIComponent(requested)));
  if (!filePath.startsWith(root)) return null;
  return filePath;
}

const server = http.createServer((request, response) => {
  const filePath = resolveRequest(request.url);
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, body) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const type = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type });
    response.end(body);
  });
});

fs.mkdirSync(logDir, { recursive: true });
server.listen(0, "127.0.0.1", () => {
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/`;
  fs.writeFileSync(portFile, `${url}\n`, "utf8");
  console.log(`Next Step Basketball running at ${url}`);
});
