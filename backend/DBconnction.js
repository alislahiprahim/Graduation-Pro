var mongoose = require('mongoose')

function DBconnection(){
    return mongoose.connect("mongodb://localhost:27017/DEMOAPP");

}
module.exports = DBconnection