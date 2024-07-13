const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../SQLize");

class PaymentHistory extends Model {}

PaymentHistory.init(
  {
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    onPlatform: {
      type: DataTypes.BOOLEAN, // 1: internal, 0: external
      defaultValue: true,
      allowNull: true,
    },
    action: {
      type: DataTypes.ENUM("DEPOSIT", "WITHDRAW", "TRANSFER", "OPEN", "CLOSE"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("SUCCESS", "FAILED", "PAUSED"),
      allowNull: false,
    },
  },
  {
    sequelize,
    updatedAt: false,
  }
);

module.exports = PaymentHistory;
