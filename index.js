const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const PORT =  3000

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    
})



app.listen(PORT,()=>{

    console.log(`Server running on ${PORT}`)
})
