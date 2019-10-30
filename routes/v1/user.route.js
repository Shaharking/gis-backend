var express = require("express");
var router = express.Router();
var userController = require("../../controllers/user.controller");
var tourRoute = require("./tour.route");
var tripOfferRoute = require("./tripOffer.route");
/* GET home page. */
router.use(userController.AddUserToRes);
router.use("/tour", tourRoute);
router.use("/tripOffers", tripOfferRoute);

module.exports = router;
