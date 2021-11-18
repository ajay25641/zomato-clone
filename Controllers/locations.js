const Locations = require("../Models/locations");
exports.getLocations = (req, res) => {
  Locations.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
