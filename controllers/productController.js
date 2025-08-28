const Product = require("../models/productModeL")
const Location = require("../models/locationModel")



exports.addProducts = async (req, res) => {


    try {

        const {warehouse_code} =  req.params
        const {transaction_date,products} = req.body


        for(let p of products){

            const location  = await Location.findOne({
                location_code : p.location_code
            })

            if(!location){
                return res.status(400).json({
                    "error" : `Location ${p.location_code} not found`
                })
            }


            if(!p.location_code.startsWith(warehouse_code)){
                return res.status(400).json({

                    "error" : `Location ${p.location_code}  does not belong to same warehouse`

                })
            }
        }

        const productDocs = products.map(p=>({

            transaction_date,
            warehouse_code,
            ...p
        }))


        const saveProducts = await Product.insertMany(productDocs) ;

        res.status(201).json({
            "success": true,
            "message": "Products added successfully"
        })


    } catch (e) {
        res.status(500).json({
            "success": false,
            "message": "Location Doesn’t belong to a specific warehouse"
        }
       )
    }




}