const mongoose = require("mongoose");
const schema = mongoose.Schema;

const RestaurantsSchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("restaurant", RestaurantsSchema, "restaurant");
