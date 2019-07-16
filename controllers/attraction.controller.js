var attractionHandler = require("../handlers/attraction.handler");

async function getAttractions(req, res, next) {
  let attractions;
  try {
    attractions = await attractionHandler.getAllAttractions();
  } catch (ex) {
    attractions = [];
  }

  res.send(attractions);
}

module.exports = {
  getAttractions
};
