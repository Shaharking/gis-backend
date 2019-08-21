var tourHandler = require("../handlers/tour.handler");

async function getUserTours(req, res, next) {
  const userId = res.locals.user.id;
  const tours = await tourHandler.getToursFromUser(userId);
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
