const Restaurants = require("../Models/restaurants");
exports.getRestaurants = (req, res) => {
  Restaurants.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
