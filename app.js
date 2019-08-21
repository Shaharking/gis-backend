var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var passport = require("passport");
var flash = require("connect-flash");

require("./passport/local-passport")(passport);
require("./passport/jwt-passport")(passport);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function(err, req, res, next) {
  let statusCode = err.status ? err.status : 500;
  let message = err.message ? err.message : "Something broke!";
  res.status(statusCode).send(message);
});

module.exports = app;
