module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Employee;
};
