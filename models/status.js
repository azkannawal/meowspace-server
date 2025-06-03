const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Status = sequelize.define('Status', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Status, { foreignKey: 'userId' });
Status.belongsTo(User, { foreignKey: 'userId' });


module.exports = Status;
