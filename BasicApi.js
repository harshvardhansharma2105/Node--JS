const http = require("http")
const userData = [
    {
        name : "harsh",
        age : 26,
        city: "jaipur",
    },
    {
        name:"Khushi",
        age:23,
        city:"bhilwara",
    }
]
http.createServer((req, resp)=>{
    resp.writeHead(200, {"Content-Type" : "application/json"})
    // const city = userData.map(item => item.city) //only for city in above useradata
    const lastTwoCities = userData.slice(-2).map(item => item.city);
    // resp.write(JSON.stringify(userData[0, 1].city));
    resp.write(JSON.stringify(lastTwoCities));
    resp.end();
}).listen(4002);