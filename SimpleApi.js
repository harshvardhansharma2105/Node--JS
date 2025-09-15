const http = require('http');
const userData = [
    {
        name: "Harsh",
        age: 26,
        email: "bbkas@njd.vd"
    },
    {
        name: "Khushi",
        age: 23,
        email: "khushi@njd.vd"
    }
];
http.createServer((req, resp)=>{
    resp.writeHead(200, {"Content-type" : 'application/json'}); //we use writeHead to to communicate with browser what to show if no error and what to show if there is any error,
    resp.write(JSON.stringify(userData[0].name));
    resp.end();
}).listen(4000);