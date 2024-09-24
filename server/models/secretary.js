const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const userLevel = require('./userLevel');

const secretary = sequelize.define('secretary', {
    FIRST_NAME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LAST_NAME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PASSWORD: {  // Changed to PascalCase to match other fields
        type: DataTypes.STRING,
        allowNull: false
    },
    SCHEDULE: {  // Changed to PascalCase to match other fields
        type: DataTypes.STRING,
        allowNull: false
    },
    ROOM_NUMBER: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FLOOR_NUMBER: {  // Changed to PascalCase to match other fields
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DEPARTMENT: {
        type: DataTypes.STRING,
        allowNull: false
    },
    USER_LEVEL_ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

secretary.belongsTo(userLevel, {
    foreignKey: {
        name: 'USER_LEVEL_ID',
        allowNull: false
    }
});
userLevel.hasMany(secretary, {
    foreignKey: {
        name: 'USER_LEVEL_ID',
        allowNull: false
    }
});

module.exports = secretary;  // Corrected from modules.exports to module.exports
