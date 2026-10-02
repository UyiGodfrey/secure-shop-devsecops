const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        status: "healthy"
      })
    );

    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("SecureShop API");
});

// nosemgrep: problem-based-packs.insecure-transport.js-node.using-http-server.using-http-server -- HTTP is limited to this loopback-only local lab server.
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
