const RestaurantsByCity = require("../Models/restaurantsByCity");
const RestaurantFilter = require('../Models/restaurantFilter');
exports.getRestaurantsByCity = (req, res) => {
  const { city } = req.params;
  RestaurantsByCity.find({ location_id: parseInt(city) })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
exports.getRestaurantFilter = (req, res) => {
  let { location, cuisine, mealtype_id, lcost, hcost, sort, page } = req.body;
 cuisine = cuisine.length>0?cuisine : null;
 location = location ==='0'?null:location;
  sort = sort ? sort : 1;
  page = page ? page : 1;
  const itemsPerPage = 2;

  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  let filterObj = {};
  location && (filterObj["location_id"] = location);
  cuisine && (filterObj["cuisine_id"] = {$in:cuisine} );
  mealtype_id && (filterObj["mealtype_id"] = mealtype_id);
 
  lcost && hcost && (filterObj["min_price"] = {$lte:hcost , $gte:lcost } );
   
 RestaurantFilter.find(filterObj)
    .sort({ min_price: sort })
    .then((response) => {
      let pageArr = [];
     
      for (let i = 1; i <= Math.ceil(response.length / itemsPerPage); i++) {
        pageArr.push(i);
      }
      const filteredResponse = response.slice(startIndex, endIndex);
      res.status(200).json({
        restaurants: filteredResponse,
        pages: pageArr,
        total_restaurants: response.length,
      });
    })
    .catch((err) => res.status(200).json(err))
  
};


