const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Asset = require('../model/asset');
const Employee = require('../model/employee');

const ReturnTransaction = sequelize.define('ReturnTransaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asset,
            key: 'id',
        },
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
        },
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnReason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});



module.exports = ReturnTransaction;
