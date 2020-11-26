const mongoose = require('mongoose');


const subscriberSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    crux: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Subscriber', subscriberSchema);

