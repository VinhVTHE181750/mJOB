const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class Auth extends Model {}

Auth.init(
  {
    hash: DataTypes.STRING(128),
    salt: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("USER", "SUPPORT", "MOD", "ADMIN"),
      defaultValue: "USER",
    },
    code: {
      // Verification code, used for email verification and password reset
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    isActivated: {
      // Account activation status, used for email verification
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isLocked: {
      // Account lock status, used for moderation
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lockExpires: {
      // Account lock expiration time, used for moderation
      type: DataTypes.DATE,
    },
    isOnline: {
      // Online status, used for chat and other real-time features
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastOnline: {
      // Last online time, used for chat and other real-time features
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    getterMethods: {
      _lastOnline() {
        if (isOnline) return new Date();
        return this.lastOnline ? this.lastOnline : null;
      },
    },
    setterMethods: {},
  }
);

module.exports = Auth;
