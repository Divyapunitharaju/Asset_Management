const { Sequelize } = require("sequelize");

const db=new Sequelize(
    'Manage',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres'
    }
)

module.exports=db