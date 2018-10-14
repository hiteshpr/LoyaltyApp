const user_details = require('../models/user_details.model'),
jwt = require('jsonwebtoken'),
randtoken = require('rand-token'),
auth = require('../auth'),
password_hash= require('password_hash'),
redis = require("redis"),
client = redis.createClient();

exports.user_login = function (req, res) {
    

    user_details.find({email: req.body.email}, function (err,user){
   
        if (err) {
            res.status(403);
                res.json({
                    'status': false, 'message':'Error occured.'
                });            
        }

        if(user.length > 0){

        var user = user[0];

            if(password_hash(req.body.password).verify(user.password)){

                var token = generateJwtToken(user.id, user.email );
                
                res.json(token);
                }
                else{
                res.status(403);
                res.json({
                    'status': false, 'message':'Incorrect password'
                  });
                }
          }
          else
          {
            res.status(404);
            res.json({
              'status': false, 'message':'Account not found. Please contact admin.'
            });
          }


    });
};


exports.user_create = function(req, res){

    let pass=req.body.password;
    let salt = password_hash().salt();
    let password = password_hash(pass).hash(salt);
    var userEmail = req.body.email;

    let user = new user_details(
        {
            name: req.body.name,
            email : userEmail,
            password : password,
            loyalty_card_no : getLoyaltyNumber(),
        }
    );

    user_details.count({email: userEmail}, function (err, cnt){

        if(cnt==0){
            user.save(function (err) {
        if (err) {
              console.log(err);
        }
        res.json({
            'status': true, 'message':'User Created successfully'
            });
        })
    }
    else{
        res.status(400);
        res.json({
            'status': false, 'message':'Account already exists.'
            });
        }
    });
};


exports.get_all_details = function (req,res){

    userId=res.locals.userId;
    console.log('userId', userId);
    user_details.findById(userId,{"password":0}).lean().exec(function (err, user) {

        if (err) {
            console.log(err);
            res.status(403);
                res.json({
                    'status': false, 'message':'Error occured.'
                });            
        }

        res.json({
            'status': true, 'message':'User fetched successfully', 'data': user
          });
    });

};



function generateJwtToken(id, email){

    var userDat = {
        'id' : id ,
        'email': email,
        };

    var token = jwt.sign(userDat, auth.secretCode , { expiresIn: 1800 });           // Expires in 30 mins
    var refreshToken = randtoken.uid(128);                                          // random string for refresh token
    updateRefToken(userDat, refreshToken);

    return {'token': token, 'refreshToken': refreshToken};

}



// Set refresh token in Redis
function updateRefToken(userData, refToken){

    client.set(refToken, userData.id);

    client.expire(refToken, 432000); // Expiry time in seconds; Currently set to 5 days
}


// generate Loyalty Card Number
function getLoyaltyNumber(){
    
    return randtoken.uid(8);

}