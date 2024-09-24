const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const userLevel = require('./userLevel');

const patient = sequelize.define('patient', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FIRST_NAME: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MIDDLE_NAME: {
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
    CONTACT_NUMBER: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ADDRESS: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    SEX: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    AGE: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    BIRTHDAY: {
        type: DataTypes.DATE,
        allowNull: false
    },
    PASSWORD: {
        type: DataTypes.STRING,  // Corrected type from DATE to STRING
        allowNull: false
    },
    USER_LEVEL_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    VERIFIED: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    PROFILE_PIC: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    USER_LEVEL_ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

patient.belongsTo(userLevel, {
    foreignKey: {
        name: 'USER_LEVEL_ID',  // Enclosed in quotes
        allowNull: false
    }
});

userLevel.hasMany(patient, {
    foreignKey: {
        name: 'USER_LEVEL_ID',  // Enclosed in quotes
        allowNull: false
    }
});

module.exports = patient;  // Corrected from modules.exports to module.exports
