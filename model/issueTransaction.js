const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Asset = require('../model/asset');
const Employee = require('../model/employee');

const IssueTransaction = sequelize.define('IssueTransaction', {
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
        references: {
            model: Employee,
            key: 'id',
        },
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
})


module.exports = IssueTransaction;
