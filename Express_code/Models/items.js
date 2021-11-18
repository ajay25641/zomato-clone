const mongoose = require("mongoose");
const schema = mongoose.Schema;

const menuItemSchema = new schema({
 
  restaurantId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("item", menuItemSchema, "items");
