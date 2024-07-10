const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../SQLize");

class Balance extends Model {}

Balance.init(
  {
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
  }
);

module.exports = Balance;
