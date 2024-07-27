const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Ticket extends Model {}

Ticket.init(
  {
    /**
     * Do not use **by** directly unless neccessary.
     * Use **getAuthor()** instead.
     *
     */
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
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.INTEGER,
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
