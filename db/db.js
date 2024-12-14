const { Sequelize } = require("sequelize");

const db=new Sequelize(
    'Asset3',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres'
    }
)

module.exports=db