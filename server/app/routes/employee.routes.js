const auth = require("./middleware/authJWT");

module.exports = app => {
  const employees = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  // login
  router.post("/login", employees.login);

  // Create a new Employee
  router.post("/", auth.adminOnly, employees.create);

  // Retrieve all Employees
  router.get("/", auth.adminOnly, employees.findAll);

  // Update a Employee with id
  router.put("/:id", auth.adminOnly, employees.update);

  // Delete a Employee with id
  router.delete("/:id", auth.adminOnly, employees.delete);

  app.use('/api/employees', router);
};
