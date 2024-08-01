const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Ticket extends Model {}

Ticket.init(
  {
    // use object and objectId on reports to specify what the report is about
    object: {
      type: DataTypes.ENUM("USER", "POST", "COMMENT", "JOB", "OTHER"),
      allowNull: true,
    },
    objectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // use title, content on support and feedback tickets
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // for all tickets, can be anonymous
    from: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Anonymous",
    },

    type: {
      type: DataTypes.ENUM("SUPPORT", "REPORT", "FEEDBACK", "OTHER"),
      allowNull: false,
      defaultValue: "OTHER",
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = Ticket;
