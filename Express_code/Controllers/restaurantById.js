const restaurantById = require("../Models/restaurantById");

exports.getRestaurantById = (req, res) => {
  const { resId } = req.params;
  console.log(resId)
  
  restaurantById
    .findById(resId)
    .then((response) => {
      console.log('inside findOne' , resId);
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
