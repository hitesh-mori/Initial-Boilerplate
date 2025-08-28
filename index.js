const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()


const app = express()
const PORT =  3000

const locationRoutes = require("./routes/locRoutes")

 
app.use(bodyParser.json())

app.use("/api",locationRoutes);


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology :true
}).then(()=>{

    console.log("MongoDB Connected")

    app.listen(PORT,()=>{


        console.log(`Server Running on  ${PORT} `)

    })

}).catch(e => console.log(`Error : ${e}`))