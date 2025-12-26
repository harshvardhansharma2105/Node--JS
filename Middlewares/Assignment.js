import express from 'express';
const app = express();

function Middleware(req,res,next){
    const time = new Date().toLocaleString();
    console.log(`[${time}] URL hit: ${req.url}`);
    next();
} 

app.get('/add', Middleware, (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a+b,
    })
})
app.get('/multiply', (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a*b,
    })
})
app.get('/sub', (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans : a-b,
    })
})
app.listen(5000);