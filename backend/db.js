const mongoose = require('mongoose');
require("dotenv").config();
const connectToMongo=()=>{
    mongoose.connect(`mongodb+srv://abhinavchaitanyadtu:${process.env.DBPASS}@cluster0.ymevs4r.mongodb.net/notelyDB`,{useNewUrlParser: true},()=>{
    });
}
module.exports = connectToMongo;
