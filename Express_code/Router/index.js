const express = require("express");
const route = express.Router();
const locationController = require("../Controllers/locations");
const mealTypeController = require("../Controllers/mealTypes");
const restaurantsController = require("../Controllers/restaurants");
const restaurantsByCityController = require("../Controllers/restaurantsByCity");
const restaurantByIdController = require("../Controllers/restaurantById");
const menuItemController =  require("../Controllers/items");
const paymentGatewayController = require("../Controllers/PaymentGateway");
const userController = require("../Controllers/users");
route.get("/locations", locationController.getLocations);
route.get("/mealtypes", mealTypeController.getMealTypes);
route.get("/restaurants", restaurantsController.getRestaurants);
route.get("/getRestaurantByCity/:city", restaurantsByCityController.getRestaurantsByCity);
route.post("/filter", restaurantsByCityController.getRestaurantFilter);
route.get(
  "/getRestaurantById/:resId",
  restaurantByIdController.getRestaurantById
);
route.get("/menuitems/:resId" , menuItemController.getMenuItemsByResId);
route.post('/payment', paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);
route.post("/signup" , userController.userSignUp);
route.post("/login" , userController.userLogin);

module.exports = route;
