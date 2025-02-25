const { selectFields } = require('express-validator/lib/field-selection');
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captains'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }, 
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    },
    paymentID: {
        type: String
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },
    otp: {
        type: String,
        select: false,
        required: true
    },
})

module.exports = mongoose.model('ride', rideSchema);