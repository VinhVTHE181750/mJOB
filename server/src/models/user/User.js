const Auth = require("./Auth");
const Comment = require("../forum/comment/Comment");
const CommentLike = require("../forum/comment/CommentLike");
const Post = require("../forum/post/Post");
const PostLike = require("../forum/post/PostLike");
const PublicChatMessage = require("../forum/chat/PublicChatMessage");
const { sequelize } = require("../SQLize");
const { Model, DataTypes } = require("sequelize");
const PublicRoomUser = require("../forum/chat/PublicRoomUser");
const PublicChatRoom = require("../forum/chat/PublicChatRoom");
const Balance = require("../payment/Balance");
const WorkExperience = require("./WorkExperience");

class User extends Model {}

User.init(
  {
    // basic user info
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    citizenId: {
      type: DataTypes.STRING,
    },

    // personal info
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },

    // actor info
    isStudent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    // moderation info
    isMuted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    getterMethods: {
      _fullName(locale) {
        if (locale === "vi-VN") {
          return this.lastName + " " + this.firstName;
        }
        return this.firstName + " " + this.lastName;
      },
    },
  }
);

User.hasOne(Auth);
Auth.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(PostLike);
PostLike.belongsTo(User);

User.hasMany(CommentLike);
CommentLike.belongsTo(User);

User.belongsToMany(PublicChatRoom, { through: PublicRoomUser });
PublicChatRoom.belongsToMany(User, { through: PublicRoomUser });

User.hasOne(Balance);
Balance.belongsTo(User);


// missing LinkedProfile


<<<<<<< Updated upstream
User.hasMany(WorkExperience);
=======
User.hasOne(WorkExperience);
>>>>>>> Stashed changes
WorkExperience.belongsTo(User);

// missing Education

// missing Skill

// missing JobPreference

// missing ProfileLog

// missing ProfileHistory

// missing ProfileMetric

// missing Follow
// UserId1, UserId2, with createdAt
// if one-way -> follow
// if two-way -> friend

// missing ChatRoom
// id, createdAt, lastMessageAt, messageCount
// ChatRoom with 2 members -> private chat (should create a getter method to return chat room type)
// ChatRoom with 3+ members -> group chat

// missing ChatRoomMember: 1 ChatRoom -> N members => allow group chat
// ChatRoomId, UserId, with createdAt

// missing ChatMessage: 1 ChatRoomMember -> N messages
// ChatRoomId, UserId, content, with createdAt

// missing Notification
// UserId, content, isRead, with createdAt, readAt

module.exports = User;
