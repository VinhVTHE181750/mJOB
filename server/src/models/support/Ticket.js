const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Ticket extends Model {}

Ticket.init(
  {
    by: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM("REPORT", "SUPPORT", "OTHER"),
      allowNull: false,
      defaultValue: "SUPPORT",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      // true = OPEN, false = CLOSED
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    getterMethods: {
      getAuthor() {
        return this.by ? this.by : "Anonymous";
      },
    },
  }
);

module.exports = Ticket;
