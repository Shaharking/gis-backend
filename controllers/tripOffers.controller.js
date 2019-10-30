var tripOfferHandler = require("../handlers/tripOffers.handler");

async function createTripOffer(req, res, next) {
  const userId = res.locals.user.id;
  const { tripId, cost } = req.body;
  await tripOfferHandler.updateTripOffers({ tripId, userId, cost });
  res.send({});
}

async function createTripOrder(req, res, next) {
    const { tripId, userId } = req.body;
    await tripOfferHandler.createTripOrder({ tripId, userId });
    res.send({});
}

module.exports = { createTripOffer, createTripOrder };
