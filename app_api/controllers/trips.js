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

        //console.log(q); //shows the results of the query on the console

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

        //console.log(q); //shows the results of the query on the console

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

//POST: /trips - Adds a new trip
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        {//Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return New Trip
            return res
                .status(201)
                .json(q);
        }

        
};

//PUT: /trips/:tripCode - Adds a new trip
const tripsUpdateTrip = async(req, res) => {
    //uncoment for debugging
    //console.log(req.params);
    //console.log(req.body);

    const q = await Model.findOneAndUpdate({'code': req.params.tripCode }, 
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        {new: true}
    )
    .exec();

    if(!q)
        {//Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return updated Trip
            return res
                .status(201)
                .json(q);
        }
}


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};