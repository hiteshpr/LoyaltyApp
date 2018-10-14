const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  common = require('./common'),
  config = common.config();

require('dotenv').config();


// Set up mongoose connection

const mongoose = require('mongoose');
mongoose.connect(config.DB_URL);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// mongoose setup completed


// CORS code
app.use(cors());
// CORS ends

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Redis Code
let redis = require('redis');
let redisClient = redis.createClient(); // create a Redis Client

redisClient.on('ready', function () {
  console.log("Redis is ready"); // If redis successfully started, console log this
});

redisClient.on('error', function () {
  console.log("Error in Redis"); //     if redis successfully started, console log this
});


// import routes and JWT library
const jwt = require('jsonwebtoken'),
  auth = require('./auth'),
  loginRoute = require('./routes/login.route'),
  signupRoute = require('./routes/signup.route'),
  userRoute = require('./routes/user.route'),
  productRoute = require('./routes/product.route');

// define routes that do not require authentication here
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/products', productRoute);

/* middleware to test authentication of the user. */
app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var header = JSON.parse(req.headers['authorization']);
  var token = header.token;

  if (token) {
    //Decode the token
    jwt.verify(token, auth.secretCode, (err, decod) => {
      if (err) {
        res.status(403).json({
          message: "Wrong Token or Token Expired. Please Login Again."
        });
      } else {
        //If decoded then call next() so that respective route is called.
        res.locals.userId = decod.id;
        res.locals.emailId = decod.email;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: "No Token"
    });
  }
});
/* middleware to test authenticatuin ends */

/* define routes that require authentication here */
app.use('/user', userRoute); 


// post on which node server would run.
const port = 1234;

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});

