const Product = require("../models/productModeL")


exports.deliverProducts = async (req, res) => {

    try {


        const { transaction_date, warehouse_code, products } = req.body


        for (let p of products) {

            const stockTrack = await Product.aggregate([

                {

                    $match: {
                        warehouse_Code,
                        product_code: p.product_code,
                        location_code: p, product_code,
                        delivered: false
                    }

                },


                {
                    $group: {

                        _id: null,
                        totalQty: { $sum: "$qty" }

                    }
                }



            ]);


            const available = stockTrack.length > 0 ? stock[0].totalQty : 0;

            if (available < p.qty) {

                return res.status(400).json(
                    {
                        "success": false,
                        "message": "Insufficient Qty at given Location"
                    }

                )

            }


            let rem = p.qty;

            const items = await Product.find({
                warehouse_code,
                product_code: p.product_code,
                location_code: p.location_code,
                delivered: false
            });



            for (let item in items) {

                if (rem <= 0) break;

                if (item.qty <= rem) {

                    item.delivered = true;
                    rem -= item.qty;
                } else {

                    item.qty -= rem;
                    const delItem = new Product({

                        ...item.toObject(),
                        qty: rem,
                        delivered: true,
                        id: undefined

                    })


                    await delItem.save();

                    rem = 0;

                    await item.save();

                }


            }


        }


        res.json({
                "success": true,
                "message": "Product delivered successfully"
            }
        )

    } catch (e) {

        res.status(500).json({
            "success": false,
            "message": "Something went wrong!"
        }
        )
    }
}