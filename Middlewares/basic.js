import express from "express";
const app = express();

// function checkroute(req, res,next)  {
//     console.log(req.url)
//     next();                                              //this is basic example of middleware
// }

//OR

app.use((req,res,next)=>{
    console.log(req.url);
    next();
})


// app.use(checkroute) 

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