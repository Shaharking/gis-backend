var tourHandler = require("../handlers/tour.handler");

const USER_TYPES = {
  COMPANY: 0,
  TOURIST: 1
};

async function getUserTours(req, res, next) {
  const user = res.locals.user;
  let tours;
  if (user.user_type === USER_TYPES.TOURIST) {
    const userId = res.locals.user.id;
    tours = await tourHandler.getToursFromUser(userId);
  } else if (user.user_type === USER_TYPES.COMPANY) {
    tours = await tourHandler.getAllOpenTours();
  }
  res.send(tours);
}

async function createTour(req, res, next) {
  const userId = res.locals.user.id;
  const tour = {
    creator_id: userId
  };
  let tourAttractions = req.body.attractions;
  const response = await tourHandler.createTour(tour, tourAttractions);
  res.send(response);
}

module.exports = {
  getUserTours,
  createTour
};
