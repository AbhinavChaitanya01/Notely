const mongoose = require('mongoose');
require("dotenv").config();
const connectToMongo=()=>{
    mongoose.connect(`mongodb+srv://abhinavchaitanyadtu:${process.env.DBPASS}@cluster0.ymevs4r.mongodb.net/notelyDB`,{useNewUrlParser: true},()=>{
        console.log("Connected to mongo successfully");
    });
}
module.exports = connectToMongo;
