const auth = require("./middleware/authJWT");

module.exports = app => {
  const reviews = require("../controllers/review.controller.js");

  var router = require("express").Router();

  // Create a new Review
  router.post("/", auth.adminOnly, reviews.create);

  // Retrieve all Reviews
  router.get("/", auth.adminOnly, reviews.findAll);

  // Find with condition
  router.get("/find", auth.authorized, reviews.find);

  // Update a Review with id
  router.put("/:id", auth.adminOnly, reviews.update);

  // Delete a Review with id
  router.delete("/:id", auth.adminOnly, reviews.delete);

  app.use('/api/reviews', router);
};
