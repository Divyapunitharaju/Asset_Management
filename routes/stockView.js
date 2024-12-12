const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const { Op } = require('sequelize')
const sequelize = require('../db/db')

route.get('/', async (req, res) => {
    try {
        const stockValue = await Asset.findAll({
            where: { status: 'Available' },
            attributes: [
                'branch',
                'name',
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_assets'],
                [sequelize.fn('SUM', sequelize.col('value')), 'total_value']
            ],
            group: ['branch','name']
        })

        const stock = stockValue.map(item => item.dataValues)

        const totalValue = await Asset.sum('value', {
            where: { status: 'Available' },
        })

        console.log(stock)
        console.log(totalValue)

        res.render('stock', { stock, totalValue })
    } catch (err) {
        console.error("Error fetching stock data:", err)
        res.status(500).json({ message: "Error fetching stock data", error: err.message })
    }
})

module.exports = route
