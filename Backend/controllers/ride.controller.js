const rideService = require('../services/ride.service');
const {validationResult} = require('express-validator');
const mapsService = require('../services/maps.service')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {userId, pickup, destination, vehicleType} = req.body; 

    try{
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        
        
        const pickUpCoordinates = await mapsService.getAddressCoordinate(pickup);
        // console.log("COord",pickUpCoordinates);
        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickUpCoordinates.ltd, pickUpCoordinates.lng, 2000);
        // console.log("captainsInRadius",captainsInRadius);
        
        return res.status(200).json(ride);

    } catch(err){
        return res.status(400).json({ message: err.message});
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination} = req.query;
    
    try{
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch(err){
        return res.status(400).json({ message: err.message});
    }
}
