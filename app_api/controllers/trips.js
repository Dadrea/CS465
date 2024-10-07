const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register Model
const Model = mongoose.model('trips');

//GET: /trips - lists all the trips 
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) //No filter, return all records 
        .exec();

        console.log(q); //shows the results of the query on the console

        if(!q)
        { // Database returned no data
            return res
                    .status(404)
                    .json(err);
        } else { //return resulting trips list
            return res
                    .status(200)
                    .json(q);
        }
};

//GET: /trips/:tripCode - lists single trips 
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode}) //Return single record
        .exec();

        console.log(q); //shows the results of the query on the console

        if(!q)
        { // Database returned no data
            return res
                    .status(404)
                    .json(err);
        } else { //return resulting trips list
            return res
                    .status(200)
                    .json(q);
        }
};

module.exports = {
    tripsList,
    tripsFindByCode
};