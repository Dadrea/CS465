const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});


//Where we import the controllers that will be routed
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');


//Authentication routers
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

//Define route for our trips endpoint 
router
    .route('/trips')
    .get(tripsController.tripsList) //GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); //POST method adds a trip

//GET method routes tripsFindByCode
//PU method routes tripsUpdateTrip
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;


