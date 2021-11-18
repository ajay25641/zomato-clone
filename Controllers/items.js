const menuItems = require("../Models/items");
exports.getMenuItemsByResId = (req, res) => {
    const {resId} = req.params;
    menuItems.find({restaurantId : resId})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
 