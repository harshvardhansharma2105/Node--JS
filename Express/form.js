// const express = require('express');
import express from 'express';
import login from './calling-files/login.js';
import home from './calling-files/home.js';
import submit from './calling-files/submit.js';
const app = express();

app.get('/home', (req,res)=>{
    res.send(home());
});

app.get('/login', (req,res)=>{
    res.send(login());
})

app.post("/submit", (req,res)=>{
    res.send(submit());
})

app.listen(4000);