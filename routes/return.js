const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const Employee = require('../model/employee')
const ReturnTransaction = require('../model/returnTransaction')


route.get('/', async (req, res) => {
    try {
        const assets = await Asset.findAll({ where: { status: 'Issued' } });
        const employees = await Employee.findAll();
        res.render('return', { assets, employees })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error updating return transaction " })
    }

})

route.post('/', async (req, res) => {
    const { assetId, employeeId, returnDate, returnReason } = req.body;
    try {
        if (!assetId || !employeeId || !returnDate || !returnReason) {
            return res.status(404).json({ message: "All fields are required" })
        }
        const asset = await Asset.findOne({ where: { id: assetId } })
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" })
        }
        if (asset.status !== 'Issued') {
            return res.status(404).json({ message: 'Asset is not Issued' })
        }
        const employee = await Employee.findOne({ where: { id: employeeId } })
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        await Asset.update({ status: 'Available' }, { where: { id: assetId } })
        const returnAsset = await ReturnTransaction.create({ assetId, employeeId, returnDate, returnReason })
        res.status(200).json({ returnAsset, message: "Asset is Returned Successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error updating return transaction " })
    }
})



module.exports = route