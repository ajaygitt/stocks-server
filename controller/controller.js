var db = require("../model/connection");
var collection = require("../model/collections");
var bcrypt = require("bcrypt");

const {
  STOCK_COLLECTION
} = require("../model/collections");
const { ObjectID } = require("bson");

module.exports = {
 

  getStocks:()=>{

    return new Promise(async(resolve,reject)=>{

   let stocks=await   db.get().collection(collection.STOCK_COLLECTION).find().toArray()

   console.log("got it",stocks);
resolve(stocks)
    })
  }





};
