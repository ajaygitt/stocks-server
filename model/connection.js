
var mongoClient = require('mongodb').MongoClient
let state = {
    dbName: ""
}
module.exports = {
    connect: (done) => {
        const dbName = "stocks"
        const url = "mongodb+srv://ajay:gamechanger1-@cluster0.s6tin.mongodb.net/stocks?retryWrites=true&w=majority"
        mongoClient.connect(url, (err, data) => {
            if (err) {
                return done(err)
            }
            else {
                state.dbName = data.db(dbName)
                done()
            }
        })
    },
    get: () => {
        return state.dbName
    }
}