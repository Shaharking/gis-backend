var express = require("express");
var router = express.Router();
var tourController = require("../../controllers/tour.controller");
/* GET home page. */
router.get("/", tourController.getUserTours);
router.post("/", tourController.createTour);

module.exports = router;
