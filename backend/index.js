const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())
app.use(express.json());

connectToMongo();
app.get("/",(req,res)=>{
    res.send("Hello World");
})
// Available routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.listen(process.env.PORT||5000, function(){
}) 
