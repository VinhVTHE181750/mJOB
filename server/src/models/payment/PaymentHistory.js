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
    action: {
      type: DataTypes.ENUM("DEPOSIT", "WITHDRAW", "SEND", "RECEIVE", "OPEN", "CLOSE"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("SUCCESS", "FAILED", "PAUSED", "PENDING"),
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    updatedAt: false,
  }
);

module.exports = PaymentHistory;
