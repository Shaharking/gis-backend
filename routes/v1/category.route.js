var express = require("express");
var router = express.Router();
var categoryController = require("../../controllers/category.controller");

/* GET home page. */
router.get("/", categoryController.getCategories);

module.exports = router;
