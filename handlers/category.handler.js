var models = require("../models/index");

async function getAllCategories() {
  return models.Category.findAll();
}

module.exports = {
  getAllCategories
};
