const http = require("http");

http.createServer((req, resp) => {
    resp.write("Hello")
    resp.end("Server is running");
}).listen(4000);
