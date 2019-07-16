var categoryHandler = require("../handlers/category.handler");

async function getCategories(req, res, next) {
  let categories;
  try {
    categories = await categoryHandler.getAllCategories();
  } catch (ex) {
    categories = [];
  }

  res.send(categories);
}

module.exports = {
  getCategories
};
