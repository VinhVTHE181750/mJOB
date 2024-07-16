const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class FAQ extends Model {}

FAQ.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = FAQ;
