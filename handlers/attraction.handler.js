var models = require("../models/index");

async function getAllAttractions() {
  return models.Attraction.findAll({
    include: [models.Location]
  });
}

module.exports = {
  getAllAttractions
};
