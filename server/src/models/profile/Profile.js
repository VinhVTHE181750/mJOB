const{Model, DataTypes} = require("sequelize");
const {sequelize} = require("./SQLize");
class Profile extends Model {
    Profile.init({
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'userId',
          },
        },
        userAvatar: {
          type: DataTypes.TEXT,
        },
        userBio: {
          type: DataTypes.STRING(256),
        },
        userDob: {
          type: DataTypes.DATEONLY,
        },
        userAddress: {
          type: DataTypes.TEXT,
        },
        userCitizenId: {
          type: DataTypes.STRING(32),
          allowNull: false,
        },
        userEmail: {
          type: DataTypes.STRING(320),
        },
        userPhoneNumber: {
          type: DataTypes.STRING(16),
        },
      },