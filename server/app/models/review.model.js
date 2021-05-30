module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    question: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    employeeId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    }
  });

  return Review;
};
