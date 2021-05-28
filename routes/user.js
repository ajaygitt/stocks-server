var express = require('express')
const router = express.Router()
const controller=require('../controller/controller')
const csv=require('csv-parser')
const fs=require('fs')


router.get('/',(req,res)=>{
    res.send('backend')
})

router.get('/readcsv',(req,res)=>{


    console.log("haaha",req.files);
})


router.get('/stocks',(req,res)=>{

    controller.getStocks().then((result)=>{

        console.log(result,"sd");

        res.send(result)

    })
})



module.exports = router