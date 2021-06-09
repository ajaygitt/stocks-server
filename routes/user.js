var express = require('express')
const router = express.Router()
const controller=require('../controller/controller')
const csv=require('csv-parser')
const fs=require('fs')
var jwt=require('jsonwebtoken');
const { extname } = require('path');



const SECRET_KEY="SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";


function authenticateToken(req, res, next) {
 console.log("the req.body",req.body);
    if (req.body.jwt) {

    var token = req.body.jwt
  } else {
  
   var token = req.query.jwt

  }

  if (token == null) {
    console.log("token null");
    res.sendStatus(401)
  }
  else {
 
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.log("No Access",err);
        res.send("jwt corrupted")
      } else {
        req.user=user

console.log("the user is",user);

next()

      }
    })
  }
}
  


router.get('/',(req,res)=>{
    res.send('backend')
})





router.post('/signup',(req,res)=>{

    
    controller.signup(req.body).then((result)=>{
    
        console.log(result);
    if(result=='notExist')
    {
        result=true
        res.status(200).send(result)
    }
    else
    {
        result=false;
        res.status(200).send(result)
    
    }
    })
    
    
    })
    
    router.post('/Login',(req,res)=>{
        controller.Login(req.body).then((result)=>{
    
            console.log(result);
            if(result.user)
            {
                
                let jwtToken = jwt.sign(result.user,SECRET_KEY)
                res.status(200).send({user:result.Username,id:result.user._id,jwtToken})
            }
            else if(result.invalidUser)
            {
    res.send(result)
            }
            else if(result.passwordInvalid)
            {
    res.send(result)
            }
        })
    })
    



router.get('/stocks',(req,res)=>{

    controller.getStocks().then((result)=>{

        console.log(result,"sd");

        res.send(result)

    })
})



module.exports = router