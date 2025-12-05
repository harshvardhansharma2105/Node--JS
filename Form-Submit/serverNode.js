// const http = require('http');
// const {StringDecoder} = require('string_decoder');

// http.createServer((req,resp)=>{
//     resp.setHeader("Access-Control-Allow-Origin", "*");
//     resp.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
//     resp.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     if(req.method === "OPTIONS"){ // OPTIONS is the type of method which is not sent by the frontend (Our frontend sends the method like GET, POST, DELETE..etc) it is sent by the browser to check the coros permission and if we allow the OPTIONS then browser sends the POST request.
//         resp.writeHead(200);
//         resp.end();
//         return;
//     }


//     let body = "";
//     let decode = new StringDecoder("utf-8");
//     if(req.url==="/save-form" && req.method==="POST"){
//         req.on("data", (chunks)=>{
//             body += decode.write(chunks);
//         })
//         req.on("end" , ()=>{
//             body += decode.end();
//             try{
//                 const data = JSON.parse(body);
//                 resp.writeHead(200, {"Content-Type" : "application/json"});
//                 console.log("Saved data by the user", data);
//                 // resp.end("");
//                 resp.end(JSON.stringify({ success: true, data }));
//             }catch{
//                 resp.writeHead(400, {"Content-Type" : "application/json"});
//                 console.log("something went wrong");
//                 // resp.end("");
//                 resp.end(JSON.stringify({ success: false, message:"invalid json" }));
//             }
//         })
//         return;
//     }else{
//         resp.writeHead(404, {"Content-Type" : "application/json"});
//         console.log("something went wrong");
//         // resp.end("");
//         resp.end(JSON.stringify({ success: false, message:"invalid json" }));
//     }

// }).listen(4000)


// const http = require('http');
// const {StringDecoder} = require('string_decoder');

// http.createServer((req,res)=>{

//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "UPDATE", "DELETE", "OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     if(req.method === "OPTIONS"){
//         res.writeHead(200);
//         res.end();
//         return;
//     }
    

//     let body ="";
//     let decoder = new StringDecoder("utf-8");
//     if(req.method === "POST" && req.url === "/save-form"){

//         req.on("data", (chunks)=>{
//             body += decoder.write(chunks);
//         })
//         req.on("end", ()=>{
//             body += decoder.end();
//             try{
//                 const data = JSON.parse(body);
//                 res.writeHead(200, {"Content-Type" : "application/json"})
//                 console.log(data)
//                 res.end(JSON.stringify({success:true, data}));
//             }catch{
//                 res.writeHead(400, {"Content-Type" : "application/json"})
//                 res.end(JSON.stringify({success:false, message:"invalid:json"}));
//             }
//         })
//         return;
//     }
//     else{
//         res.writeHead(404, {"Content-Type" : "application/json"});
//         res.end(JSON.stringify({success:false, message:"invalid:json"}));
//     }
// }).listen(4000)



const http = require('http');
const { StringDecoder } = require('string_decoder');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'harsh123',
    database: 'formdb',
    port: 3306
});

http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === "POST" && req.url === "/save-form") {
        let body = "";
        const decoder = new StringDecoder("utf-8");
        req.on("data", (chunk) => {
            body += decoder.write(chunk);
        });
        req.on("end", async () => {
            body += decoder.end();
            try {
                const data = JSON.parse(body);
                const { name, email, message } = data;
                await pool.query(
                    "INSERT INTO form_data (name, email, message) VALUES (?, ?, ?)",
                    [name, email, message]
                );
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, data }));
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, message: "Invalid JSON or DB error", error: err.message }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Not found" }));
    }
}).listen(4000, () => console.log("Server running on port 4000"));
