// const express = require('Express');
import express from 'express';
import path from 'path';
const app = express();

app.get("/", (req,res)=>{
    res.sendFile(path.join(import.meta.dirname, 'files' , 'index.html'));
})
app.listen(3000)
