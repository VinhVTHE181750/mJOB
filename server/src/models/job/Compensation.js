const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Compensation extends Model {}

// This object stores the compensation information for each (active applicant - job)
Compensation.init(
  {
    // from, to
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Every day, the system will check if the nextPayment date has passed
    // If it has, the system will make a payment to the applicant
    //         OR the system will notify the employer to make a payment to the applicant

    // In client side, the system will show the nextPayment date to the employer
    // If nextPayment date is near (within 3 days), display as warning
    // If overdue, display as severe warning

    // Additional logic: Employer should have enough money for the next payment when they create jobs
    // For example: User A create job J1 with 10 applicants, each be paid 1000$
    // User A should have at least 10000$ plus creation fee in their account to create J1
    nextPayment: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // Every day, when the system checks the nextPayment date, it will update the status of the compensation
    // If current = PAID, set to PENDING and update nextPayment date
    // If current = PENDING, set to OVERDUE and update nextPayment date
    // If current = OVERDUE, notify the employer to make a payment
    status: {
        type: DataTypes.ENUM('PENDING', 'PAID', 'OVERDUE'),
        allowNull: false
    }
  },
  {
    sequelize,
  }
);

module.exports = Compensation;
