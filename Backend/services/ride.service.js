const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {

    if(!pickup || !destination) {
        throw new Error('Invalid pickup or destination');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}
module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const dist = await mapsService.getDistanceTime(pickup, destination);
    const distance = Math.round(dist.distance.value / 1000);
    const duration = Math.floor(dist.duration.value/60);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        distance,
        duration,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}

module.exports.confirmRide = async ({ rideId, captainId }) => {
    if(!rideId) {
        throw new Error('Invalid ride id');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId }, // changed filter from id to _id
        {
            status: 'accepted',
            captain: captainId
        }
    );

    // populate both captain and user so that user.socketId is available
    const ride = await rideModel.findOne({ _id: rideId }).populate('captain').populate('user').select('+otp');

    return ride;
}

