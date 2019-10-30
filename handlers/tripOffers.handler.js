var models = require("../models/index");
function updateTripOffers({ tripId, userId, cost }) {
  return models.TripOffers.build({
    trip_id: tripId,
    user_id: userId,
    estimation_cost: cost
  }).save();
}

module.exports = { updateTripOffers };
