const mongoose = require("mongoose");
const schema = mongoose.Schema;

const locationSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("location", locationSchema, "locations");
