const http = require("http");

http.createServer((req, resp) =>{
    resp.setHeader("Content-Type", "text/html")
    resp.write("<h2>Hello There</h2>");
    resp.end();
}).listen(4001);