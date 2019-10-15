const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const mysql = require('mysql'); 

const secretKey = "mysecretKey";
const auth = require('./auth');
app.get('/api/',(req,res) => {
    res.json({
        message : "Welcome to The API"
    });
});

app.post('/api/posts',verifyToken,(req,res) => {
    jwt.verify(req.token,secretKey,(err,authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message : "posts created",
                authData
            })
        }
    });
    res.json({
        message : "Post Started"
    });
});

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "speed"
});



app.post('/api/login',(req,res) => {
    // As of now passing the hard coded values instead of taking from req object
    const user = {
        id : 1,
        username : "pratik raut",
        email : "pratikraut@gmail.com",
    }
    jwt.sign({user:user},secretKey,(err,token) => {
        res.json({
            token:token
        })
    });
});

// Middleware function to verify Token
function verifyToken(req,res,next){
    // get Auth Headers value
    const bearerHeader = req.headers['authorizatrion'];
     if(typeof bearerHeader !== 'undefined'){
        // splitting the space
        const bearer = bearerHeader.split(' ');
        // getting token from Array
        const token = bearer[1];
        // setting the Token
        req.token = token;
        // releasing the thread
        next();
     }else{
         res.sendStatus(403);
     }
}

// To test the code hit the url as a post request 

// localhost:3000/api/posts
// set the headers key will be =>  authorization  and value will be =>  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6InByYXRpayByYXV0IiwiZW1haWwiOiJwcmF0aWtyYXV0QGdtYWlsLmNvbSJ9LCJpYXQiOjE1NzEwNDg2MDl9.1Mo-h888FcPITCFnIeFKD9d85TTpc5ldQDy9A9jKeC4
// output 
/***
 * {
    "message": "posts created",
    "authData": {
        "user": {
            "id": 1,
            "username": "pratik raut",
            "email": "pratikraut@gmail.com"
        },
        "iat": 1571048609
    }
}
 * 
 */


// Listing All Users from database from mysql
 app.get('/getUserDetails',(req,res)=>{
    if(con){
        con.connect(function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Connected !");
                var sql = "select * from user";
                con.query(sql,function(err,result,fields){
                    if(err)
                        console.log(err);
                    else{
                        res.json({"users" :result } );
                        // result.forEach(function(response){
                        //     console.log({"user" : response.username});
                        // });
                    }	
                        
                });
            }
        });
    }
 });
app.listen(3000,(req,res) => {
    console.log("Server started successfully on port 3000");
});
