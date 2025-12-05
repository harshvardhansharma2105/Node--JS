import express from 'express';
// import home from './calling-files/home.html';
// import path from 'path';

const app = express();


app.get('/home-page', (req, res)=>{

    // const path = path.resolve('./calling-files/home.html')

    res.sendFile("/workspaces/Node--JS/Express/calling-files/home.html");
})

app.listen(4000);