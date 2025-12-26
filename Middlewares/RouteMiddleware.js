import express from "express";
const app = express();

function RouteMiddleware(req,res,next){
    if(!req.query.age || req.query.age<18){

        res.send("You are not allowed to check the page");
    }
    else{
       next();
    }
}
// app.use(RouteMiddleware);

app.get('/home',RouteMiddleware,(req,res)=>{
    res.send("this is Home")
})
app.get('/product',(req,res)=>{
    res.send("this is product")
})
app.get('/about',(req,res)=>{
    res.send("this is about")
})

app.listen(4000)