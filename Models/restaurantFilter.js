const mongoose = require("mongoose");
const schema = mongoose.Schema;

const RestaurantFilterSchema = new schema({
  location_id : {
      type:Number,
  },
  cuisine_id : {
  type:Number,
  },
  mealtype_id: {
      type:Number,
  },
  min_price : {
      type:Number,
  },
  max_price :{
      type:Number,
  }
});

module.exports = mongoose.model(
  "restaurantfilter",
  RestaurantFilterSchema,
  "restaurant"
);
