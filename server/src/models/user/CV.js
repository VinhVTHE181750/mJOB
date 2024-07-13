const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class CV extends Model {}

CV.init(
  {
    // This field is the path to the CV file
    // When users upload CVs, they should be stored in the server filesystem
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = CV;
