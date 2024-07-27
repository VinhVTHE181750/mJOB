const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Ticket extends Model {}

Ticket.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Anonymous'
    },
    type: {
      type: DataTypes.ENUM("SUPPORT", "REPORT", "FEEDBACK", "OTHER"),
      allowNull: false,
      defaultValue: "OTHER",
    },
  },
  {
    sequelize,
    paranoid: true,
  }
);

module.exports = Ticket;
