const express = require('express');
const router = express.Router();

//Where we import the controllers that will be routed
const tripsController = require('../controllers/trips');

//Define route for our trips endpoint 
router
    .route('/trips')
    .get(tripsController.tripsList) //GET method routes tripList
    .post(tripsController.tripsAddTrip); //POST method adds a trip

//GET method routes tripsFindByCode
//PU method routes tripsUpdateTrip
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;


