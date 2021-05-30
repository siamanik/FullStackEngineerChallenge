const db = require("../models");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();
const Employee = db.employees;
const Review = db.reviews;
const Feedback = db.feedbacks;
const Op = db.Sequelize.Op;

// Login
exports.login = (req, res) => {
  const email = req.body.email;
  var condition = email ? { email: { [Op.eq]: `${email}` } } : null;
  
  Employee.findOne({ where: condition })
    .then(async data => {
      if(!data.dataValues) {
        res.status(401).send({
          message:"Invalid username password."
        });
      } else{
        const validPassword = await bcrypt.compare(req.body.password, data.dataValues.password)
        if(validPassword) {
          delete data.dataValues.password
          const accessToken = jwt.sign(data.dataValues, process.env.TOKEN_SECRET, { expiresIn: '18000s' });
          res.json({
              accessToken
          });
        }
        else{
          res.status(401).send({
            message:"Invalid username password."
          });
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      message: "Content can not be (partially) empty!"
    });
    return;
  }

  // Create a Employee
  const employee = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    admin: req.body.admin ? req.body.admin : false
  };
  
  // Save Employee in the database
  Employee.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  Employee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      message: "Content can not be (partially) empty!"
    });
    return;
  }

  const id = req.params.id;

  const employee = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    admin: req.body.admin ? req.body.admin : false
  };

  Employee.update(employee, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      Review.destroy({
        where: { employeeId: id }
      })
      Feedback.destroy({
        where: { employeeId: id }
      })
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

