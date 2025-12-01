const http = require("http");
const { StringDecoder } = require("string_decoder");

const PORT = 4000;

const server = http.createServer((req, res) => {
  // ============================
  //  CORS FIX (IMPORTANT)
  // ============================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // ============================
  //  POST /save-form ROUTE
  // ============================
  if (req.method === "POST" && req.url === "/save-form") {
    let body = "";
    const decoder = new StringDecoder("utf-8");

    // Read chunks
    req.on("data", (chunk) => {
      body += decoder.write(chunk);
    });

    req.on("end", () => {
      body += decoder.end();

      try {
        const data = JSON.parse(body);
        console.log("Received data:", data);

        // Here you can save 'data' to MySQL later

        // Send JSON response
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Data saved!" }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
      }
    });
  }

  // ============================
  //  404 FOR ALL OTHER ROUTES
  // ============================
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// ============================
//  START SERVER
// ============================
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
