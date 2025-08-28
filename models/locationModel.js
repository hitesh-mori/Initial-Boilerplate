const mongoose = require("mongoose")

const locSchema = new mongoose.Schema({

    location_code : {
        type : String,
        required : true,
        unique : true  
    },

    parent_location_code : {
        type: String,
        default : null
    },

    type : {type : String,enum: ["Warehouse","Storage"],required :true}
})


module.exports = mongoose.module("Location",locSchema)