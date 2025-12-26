import express from "express";
const app = express();

// app.use((req,res,next)=>{
//     if(!req.query.age || req.query.age < 18){
//         res.send("You cannot access this page")
//     }
//     else{
//         next();
//     }
// })

app.use((req,res,next)=>{
    console.log(req.socket.remoteAddress);
    next();
})

app.get('/home', (req,res)=>{
    res.send("This is home page");
})

app.get('/product', (req,res)=>{
    res.send("This is product page");
})

app.get('/about', (req,res)=>{
    res.send("This is about page");
})

app.listen(4000);