var models = require("../models/index");

async function getUser(userId) {
  const user = await models.User.findOne({
    where: {
      id: userId
    }
  });
  return user;
}

module.exports = {
  getUser
};
