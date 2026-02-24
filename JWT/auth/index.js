const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const user = []
app.post("/signup", function(req, resp){

    const username = req.body.usename;
    const password = req.body.password;

    user.push({
        username : username,
        password :password
    })

    resp.json({
        message : "you are signed in",
    })
})
app.post("/signin", function(req, resp){
    StoredUserData = null;

})
app.post("/getUsernamePassword", function(req, resp){
    
})