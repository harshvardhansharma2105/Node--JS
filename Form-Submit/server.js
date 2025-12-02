const http = require('http');
const { StringDecoder } = require('string_decoder'); //usally data comes in chunks from frontend and those chunks are in buffer not in string. to convert buffer to srting we use string decoder.

http.createServer((req,resp)=>{

  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  resp.setHeader("Access-Control-Allow-Headers" , "Content-Type");

  if(req.method === "OPTIONS"){
    resp.writeHead(200);
    resp.end();
    return;
  }

  let body = "";
  const decode = new StringDecoder('utf-8')

  if(req.url === "/save-form" && req.method === "POST"){
    req.on("data" , (chunks)=>{
      body += decode.write(chunks);
    });

    req.on("end" , ()=>{
      body += decode.end();

      try{
        const data = JSON.parse(body);
        console.log("Data recived", data);
        resp.writeHead(200, {"Content-Type" : "application/json"});
        resp.end(JSON.stringify({ success: true, message: "Data saved!" }));
      }catch{
        resp.writeHead(404, {"Content-Type" : "application/json"})
        resp.end(JSON.stringify({ success: true, message: "Data saved!" }));
      }
    });
  }else{
      resp.writeHead(404, { "Content-Type": "text/plain" });
      resp.end("Not Found");
  }

}).listen(4000, ()=>{
  console.log("running on 4000")
});

// const http = require("http");
// const { StringDecoder } = require("string_decoder");

// const PORT = 4000;

// const server = http.createServer((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") {
//     res.writeHead(200);
//     return res.end();
//   }
//   if (req.method === "POST" && req.url === "/save-form") {
//     let body = "";
//     const decoder = new StringDecoder("utf-8");

//     //req is used to listen the events.
//     req.on("data", (chunk) => {
//       body += decoder.write(chunk);
//     });

//     //we do not pass any parameter on "end" because all the chunks has been already decoded and then come to the req.end. So there are no chunks left.
//     req.on("end", () => {
//       body += decoder.end();

//       try {
//         const data = JSON.parse(body);
//         console.log("Received data:", data);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ success: true, message: "Data saved!" }));
//       } catch (error) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
//       }
//     });
//   }
//   else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Not Found");
//   }
// });
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
