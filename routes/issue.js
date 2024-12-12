const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const Employee = require('../model/employee')
const IssueTransaction = require('../model/issueTransaction')


route.get('/', async (req, res) => {
    try {
        const assets = await Asset.findAll({where: {status: 'Available'}});
        const employees = await Employee.findAll()

        res.render('issue', { assets, employees });
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error fetching data' })
    }

})
// route.get('/', async (req, res) => {
//     try {
//       const assets = await Asset.findAll();
//       const employees = await Employee.findAll();
//       const issues = await IssueTransaction.findAll()

//       res.render('issue', { assets, employees, issues });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error fetching data' });
//     }
//   })

route.post('/', async (req, res) => {
    const { employeeId, assetId, issueDate } = req.body
    try {
        if (!assetId || !employeeId || !issueDate) {
            return res.status(404).json({ message: "All fields are required" })
        }

        const asset = await Asset.findOne({ where: { id: assetId } })
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' })
        }

        if (asset.status !== "Available") {
            return res.status(404).json({ message: 'Asset is not available' })
        }

        const employee = await Employee.findOne({ where: { id: employeeId } })
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' })
        }

        await Asset.update({ status: 'Issued' }, { where: { id: assetId } })
        const issueAsset=await IssueTransaction.create({ assetId, employeeId, issueDate })
        res.status(200).json({issueAsset,message:"Asset is issued"})
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while Updating issue transaction' })
    }

})


module.exports = route