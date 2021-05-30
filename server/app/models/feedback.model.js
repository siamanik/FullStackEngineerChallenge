module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define("feedback", {
    employeeId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    },
    reviewId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    },
    answer: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    submit: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Feedback;
};
