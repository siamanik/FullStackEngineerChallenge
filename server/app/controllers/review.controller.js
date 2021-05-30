const db = require("../models");
const Review = db.reviews;
const Employee = db.employees;
const Feedback = db.feedbacks;
const Op = db.Sequelize.Op;

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({
      message: "Content can not be (partially) empty!"
    });
    return;
  }

  // Create a Review
  const review = {
    question: req.body.question,
    employeeId: req.body.employeeId
  };

  // Save Review in the database
  Review.create(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Review."
      });
    });
};

// Retrieve all Reviews from the database.
exports.findAll = (req, res) => {
  Review.findAll({ include: [Employee]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews."
      });
    });
};
// Retrieve all Reviews from the database.
exports.find = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.eq]: id } } : null;

  Review.findOne({ where: condition, include: [Employee]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews."
      });
    });
};

// Update a Review by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({
      message: "Content can not be (partially) empty!"
    });
    return;
  }

  const id = req.params.id;

  Review.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Review was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Review with id=" + id
      });
    });
};

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Review.destroy({
    where: { id: id }
  })
    .then(num => {
      Feedback.destroy({
        where: { reviewId: id }
      })
      if (num == 1) {
        res.send({
          message: "Review was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Review with id=" + id
      });
    });
};

