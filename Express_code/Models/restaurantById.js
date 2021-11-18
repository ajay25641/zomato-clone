const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    location_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema, 'restaurant');