const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Cat = sequelize.define('Cat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Cat, { foreignKey: 'userId' });
Cat.belongsTo(User, { foreignKey: 'userId' });


module.exports = Cat;
