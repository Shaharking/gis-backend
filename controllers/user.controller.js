const jwt = require("jsonwebtoken");
var jwtConfig = require("../config/jwt.config");
var userHandler = require("../handlers/user.handler");

async function AddUserToRes(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    var err = new Error("you could not be authorized");
    err.status = 401;
    next(err);
    return;
  }

  jwt.verify(authorization, jwtConfig.jwt, async function(err, decoded) {
    if (err) {
      var err = new Error("you could not be authorized");
      err.status = 401;
      next(err);
      return;
    }
    const userId = decoded.id;
    res.locals.userId = userId;
    const user = await userHandler.getUser(userId);
    res.locals.user = user;
    next();
  });
}

module.exports = { AddUserToRes };
