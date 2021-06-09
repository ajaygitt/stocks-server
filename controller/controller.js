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
  },


  signup: (userData) => {
    console.log(userData);
    status = {};
    return new Promise(async (resolve, reject) => {
      let Username = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Username: userData.User });
      if (Username) {
        status = "exist";
        resolve(status);
      } else {
        userData.Password = await bcrypt.hash(userData.Password, 10);

        status.insert = true;
        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne({ Username: userData.User, Password: userData.Password })
          .then(() => {
            status = "notExist";
            resolve(status);
          });
      }
    });
  },

  Login: (userData) => {
    console.log(userData);
    let status = {};
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ Username: userData.User });

      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((response) => {
          if (response) {
            status.user = user;
            console.log("ok user loged");
            resolve(status);
          } else {
            console.log("pwd err");
            status.passwordInvalid = true;
            resolve(status);
          }
        });
      } else {
        console.log("nouser");
        status.invalidUser = true;
        resolve(status);
      }
    });
  }



};
