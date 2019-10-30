var models = require("../models/index");
var Op = models.Sequelize.Op;

async function getToursFromUser(userId) {
  return models.Tour.findAll({
    include: [
      {
        model: models.TourAttraction
      },
      {
        model: models.TripOffers,
        include: [
          {
            model: models.User,
            attributes: ["email"]
          }
        ],
        required:false
      },
      {
        model: models.TripOrder
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

async function getAllOpenTours(userId) {
  return models.Tour.findAll({
    include: [
      {
        model: models.TourAttraction
      },
      {
        model: models.TripOffers,
        where: {
          user_id: userId
        },
        required:false
      },
      {
        model: models.TripOrder,
        required:false
      }
    ],
    where: {
      '$TripOrder.trip_id$': null
    }
  });
}

module.exports = {
  getToursFromUser,
  createTour,
  getAllOpenTours
};
