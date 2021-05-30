module.exports = {
  HOST: "localhost",
  USER: "docker",
  PASSWORD: "docker",
  DB: "hr",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
