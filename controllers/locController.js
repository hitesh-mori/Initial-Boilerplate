const Location = require("../models/locationModel");

const buildTree = (locations,parentCode=null)=>{
    return locations.filter(loc => loc.parent_location_code === parentCode)
    .map(loc => ({

        location_code : loc.location_code,
        type : loc.type,
        child : buildTree(locations,loc.location_code)
    }))
} 


// create location 
exports.CreateLocation = async (req, res) => {

    try {

        const { location_code, parent_location_code } = req.body;

        const exists = await Location.findOne({ location_code });

        if (exists) {
            return res.status(400).json({
                "success": false,
                "message": "Location already exists",
            })
        }


        if (parent_location_code) {
            const parentExists = await Location.findOne({
                location_code: parent_location_code
            })

            if (parentExists) {

                return res.status(400).json({
                    "success": false,
                    "message": "Parent not exists",
                })

            }


            const newL = new Location({ location_code, parent_location_code })

            await newL.save()

            res.status(201).json({
                "success": true,
                "message": "Location created successfully",
                "data": {
                    "location_code": location_code,
                    "parent_location_code": parent_location_code,
                    "type": "storage"
                }
            })
        }




    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }

}


//get warehouse in tree format


exports.getWareHouseTree = async (req,res)=>{


    try{

        const {warehouse_code} = req.params ;


        const allLocations =  await Location.find().lean() 


        const warehouse = allLocations.find(loc => loc.location_code == warehouse_code) 

        if(!warehouse){
            res.status(400).json({


                "error" :"Warehouse not found" 

            })
        }

        const tree = {
            location_code : warehouse.location_code,
            type : warehouse.type ,
            childs : buildTree(allLocations,warehouse.location_code)
        }

        res.json(tree) ;
    }catch(e){
        res.status(500).json(
            {
                "error" : e.message
            }
        )
    }


}