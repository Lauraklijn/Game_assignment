const Sequelize = require("sequelize");
const sequelize = require("../../db");
const Room = require("../rooms/model-rooms");

const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Room.hasMany(User);
User.belongsTo(Room);

module.exports = User;
