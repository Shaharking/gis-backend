var tripOfferHandler = require("../handlers/tripOffers.handler");

async function createTripOffer(req, res, next) {
  const userId = res.locals.user.id;
  const { tripId, cost } = req.body;
  await tripOfferHandler.updateTripOffers({ tripId, userId, cost });
  res.send({});
}

module.exports = { createTripOffer };
