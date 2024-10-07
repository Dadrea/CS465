const express = require('express');
const router = express.Router();

//Where we import the controllers that will be routed
const tripsController = require('../controllers/trips');

//Define route for our trips endpoint 
router
    .route('/trips')
    .get(tripsController.tripsList); //GET method routes tripList

//GET method routes tripsFindByCode
router  
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;


