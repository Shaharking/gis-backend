var express = require("express");
var router = express.Router();
var tourController = require("../../controllers/tripOffers.controller");
/* GET home page. */
router.post("/", tourController.createTripOffer);
router.post("/order", tourController.createTripOrder);

module.exports = router;
