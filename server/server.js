const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json());

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/employee.routes")(app);
require("./app/routes/review.routes")(app);
require("./app/routes/feedback.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
