var models = require("../models/index");

async function getToursFromUser(userId) {
  return models.Tour.findAll({
    include: [
      {
        model: models.TourAttraction
      }
    ],
    where: {
      creator_id: userId
    }
  });
}

async function getTourById(tourId) {
  return models.Tour.findOne({
    include: [
      {
        model: models.TourAttraction
      }
    ],
    where: {
      id: tourId
    }
  });
}

async function createTour(tour, tourAttractions) {
  let err, createdTour, createdAttractions;
  try {
    createdTour = await models.Tour.build(tour).save();
    tourAttractions = tourAttractions.map(attraction => {
      return Object.assign({}, attraction, {
        tour_id: createdTour.id
      });
    });
    createdAttractions = await models.TourAttraction.bulkCreate(
      tourAttractions
    );
    return await getTourById(createdTour.id);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getToursFromUser,
  createTour
};
