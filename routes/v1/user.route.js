var express = require("express");
var router = express.Router();
var userController = require("../../controllers/user.controller");
var tourRoute = require("./tour.route");

/* GET home page. */
router.use(userController.AddUserToRes);
router.use("/tour", tourRoute);

module.exports = router;
