const express = require("express") ;
const {createLocation, getWareHouseTree} =  require("../controllers/locController")
const  {addProducts} = require("../controllers/productController")



const router = express.Router() ;

router.post("/create_location",createLocation)
router.get("/warehouses/tree/:warehouse_code",getWareHouseTree)
router.post("/warehouses/:warehouse_code/products",addProducts)



module.exports = router
