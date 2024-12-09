const { Sequelize } = require("sequelize");

const db=new Sequelize(
    'assetDemo',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres'
    }
)

module.exports=db