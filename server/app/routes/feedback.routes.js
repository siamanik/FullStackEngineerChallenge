const auth = require("./middleware/authJWT");

module.exports = app => {
  const feedbacks = require("../controllers/feedback.controller.js");

  var router = require("express").Router();

  // Create a new Feedback
  router.post("/", auth.adminOnly, feedbacks.create);

  // Find
  router.get("/find", auth.adminOnly, feedbacks.find);

  // Retrieve all Feedbacks
  router.get("/", auth.authorized, feedbacks.findAll);

  // Update a Feedback with id
  router.put("/:id", auth.authorized, feedbacks.update);

  app.use('/api/feedbacks', router);
};
