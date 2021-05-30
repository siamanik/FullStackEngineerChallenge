const db = require("../models");
const Feedback = db.feedbacks;
const Employee = db.employees;
const Review = db.reviews;
const Op = db.Sequelize.Op;

// Create and Save a new Feedback
exports.create = (req, res) => {
  // Validate request
  if (!req.body.employeeId || !req.body.reviewId) {
    res.status(400).send({
      message: "Content can not be (partially) empty!"
    });
    return;
  }

  // Create a Feedback
  const feedback = {
    employeeId: req.body.employeeId,
    reviewId: req.body.reviewId,
    answer: req.body.answer ? req.body.answer : '',
    submit: req.body.submit ? req.body.submit : false
  };

  // Save Feedback in the database
  Feedback.create(feedback)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Feedback."
      });
    });
};

// Retrieve all Feedbacks from the database.
exports.findAll = (req, res) => {
  Feedback.findAll({
    where: { employeeId: req.user.id, submit: false }, include: [Employee, Review]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feedbacks."
      });
    });
};

// Retrieve all Feedbacks by reviewId from the database.
exports.find = (req, res) => {
  const reviewId = req.query.reviewId;
  var condition = reviewId ? { reviewId: { [Op.eq]: reviewId } } : null;
  
  Feedback.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving feedbacks."
      });
    });
};

// Update a Feedback by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.answer) {
    res.status(400).send({
      message: "Content can not be (partially) empty!"
    });
    return;
  }

  const id = req.params.id;

  // Create a Feedback
  const feedback = {
    answer: req.body.answer,
    submit: true
  };

  Feedback.update(feedback, {
    where: { id: id, employeeId: req.user.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Feedback was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Feedback with id=${id}. Maybe Feedback was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Feedback with id=" + id
      });
    });
};

// Delete a Feedback with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Feedback.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Feedback was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Feedback with id=${id}. Maybe Feedback was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Feedback with id=" + id
      });
    });
};

