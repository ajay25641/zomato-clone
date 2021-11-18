const mongoose = require("mongoose");
const schema = mongoose.Schema;

const MealTypeSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  mealtypeId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("mealtype", MealTypeSchema, "mealtype");
