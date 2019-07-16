var express = require("express");
var router = express.Router();
var v1Route = require("./v1/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/v1", v1Route);

module.exports = router;
