var models = require("../models/index");
async function updateTripOffers({ tripId, userId, cost }) {
  const offerExist = await models.TripOffers.findOne({
      where: {
        trip_id: tripId,
        user_id: userId
      }
  });
  if (!offerExist) {
    return models.TripOffers.build({
        trip_id: tripId,
        user_id: userId,
        estimation_cost: cost
      }).save();
  }
  else {
      offerExist.estimation_cost = cost;
      return offerExist.save();
  }
}

async function createTripOrder({ tripId, userId })
{
    const offerExist = await models.TripOffers.findOne({
        where: {
          trip_id: tripId,
          user_id: userId
        }
    });

    if (offerExist) {
        return models.TripOrder.build({
          trip_id: tripId,
          user_id: userId,
          cost: offerExist.estimation_cost
        }).save();
    }
}

module.exports = { updateTripOffers, createTripOrder };
