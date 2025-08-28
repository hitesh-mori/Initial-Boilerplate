const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    transaction_date : {
        type : Date,
        required : true
    },


    warehouse_code : {

        type : String,
        required :  true
    },

    product_code : {
        type : String,
        required:true
    },


    qty : {
        type : Number,
        required :true,
    },

    volume : {

        type : Number,
        required : true
    },

    location_code : {
        type :String,
        required:true
    },

    delivered : {
        type : Boolean,
        default : false
    }

})


module.exports = mongoose.model("Product",productSchema)


// {
//   "transaction_date": “2025-07-10”,
//   "warehouse_code": "W-01",
//   "products": [
//     {
//       "product_code": "P001",
//       "qty": 100,
//       "volume": 2.5,
//       "location_code": "W-01-BIN1",
//     },
//     {
//       "product_code": "P002",
//       "qty": 50,
//       "volume": 1.2,
//       "location_code": "W-01-BIN2",
//     }
//   ]
// }
