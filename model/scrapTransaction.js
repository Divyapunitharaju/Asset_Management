const { DataTypes } = require('sequelize')
const Asset=require('../model/asset')

const sequelize = require('../db/db')

const ScrapCategory = sequelize.define('ScrapCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Asset,
          key: 'id'
        }
      },
      scrapDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      scrapReason: {
        type: DataTypes.STRING,
        allowNull: false
      }

})



module.exports=ScrapCategory