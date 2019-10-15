const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretKey';


module.exports.verifyToken = function(req,res,next) {
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

module.exports.getToken = function(req,res,next){
    const user = {
        id : 1,
        username : "pratik raut",
        email : "pratikraut@gmail.com"
    }
    const options = { expiresIn: '2d'};
    const token = jwt.sign({user:user},secretKey,options);
    return token;
    
}

module.exports.secretKey = 'mysecretKey';