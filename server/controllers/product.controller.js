
const product_schema = require('../models/products.model'),
    redis = require("redis"),
    client = redis.createClient();


exports.add = function(req, res){
    
        let product = new product_schema(
            {
                name: req.body.name,
                category : req.body.category,
                sub_category : req.body.sub_category,
                price : req.body.price,
                details : req.body.details, 
            }
        );
    
        product_schema.count({name: req.body.name}, function (err, cnt){
    
            if(cnt==0){
                product.save(function (err) {
            if (err) {
                  console.log(err);
            }
            res.json({
                'status': true, 'message':'Product Created successfully'
                });
            })
        }
        else{
            res.status(400);
            res.json({
                'status': false, 'message':'Product already exists.'
                });
            }
        });
    };

exports.get = function (req,res){

   
    product_schema.find().lean().exec(function (err, product) {

        if (err) {
            console.log(err);
            res.status(403);
                res.json({
                    'status': false, 'message':'Error occured.'
                });            
        }

        res.json({
            'status': true,'data': product
          });
    });

}
    