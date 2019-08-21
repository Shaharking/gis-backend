var express = require("express");
var router = express.Router();
var attractionRoute = require("./attraction.route");
var categoryRoute = require("./category.route");
var userRoute = require("./user.route");
const jwt = require("jsonwebtoken");
var passport = require("passport");
var jwtConfig = require("../../config/jwt.config");
var emailConfig = require("../../config/email.configl");

var models = require("../../models/index");

router.post("/register", function(req, res, next) {
  passport.authenticate(
    "local-signup",
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const { id } = user;
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({ id }, jwtConfig.jwt);
        return res.json({ token, email: user.email });
      });
    }
  )(req, res);
});

router.post("/login", function(req, res, next) {
  passport.authenticate(
    "local-login",
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const { id } = user;
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({ id }, jwtConfig.jwt);
        return res.json({ token, email: user.email });
      });
    }
  )(req, res);
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.use("/forgotPassword", async (req, res, next) => {
  let user;
  try {
    user = await models.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      user.password = makeid(8);
      await user.save();

      const mailjet = require("node-mailjet").connect(
        emailConfig.public_key,
        emailConfig.secret_key
      );
      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "shaharking@gmail.com",
              Name: "SHAHAR - GIS PRO"
            },
            To: [
              {
                Email: req.body.email
              }
            ],
            Subject: "Progis- forgot password",
            TextPart: "Your new password " + user.password,
            HTMLPart:
              '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!'
          }
        ]
      });
    }
  } catch (err) {}
});

/* GET home page. */
router.use("/attraction", attractionRoute);
router.use("/category", categoryRoute);
router.use("/user", userRoute);

module.exports = router;
