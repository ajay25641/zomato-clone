const mongoose = require("mongoose");
const schema = mongoose.Schema;

const RestaurantsByCitySchema = new schema({
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "restaurantByCity",
  RestaurantsByCitySchema,
  "restaurant"
);
