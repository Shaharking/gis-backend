var express = require("express");
var router = express.Router();
var attractionController = require("../../controllers/attraction.controller");

/* GET home page. */
router.get("/", attractionController.getAttractions);

module.exports = router;
