const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Asset = require('../model/asset')



router.post('/', async (req, res) => {
    const { serialNo, name, model, make, status, branch, value } = req.body;
    console.log("Received Data:", req.body)
    try {
        if (!serialNo || !name || !model || !make || !status || !branch || !value) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const asset = await Asset.create({ serialNo, name, model, make, status, branch, value })
        res.status(200).json({ asset, message: "Asset is Created" })


    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error creating asset' })
    }
})


router.get('/', async (req, res) => {
    const { name, make, model } = req.query;
    try {
        const whereClause = {};
        if (name) whereClause.name = name;
        if (model) whereClause.model = { [Op.iLike]: `%${model}%` };
        // if (make) whereClause.make = { [Op.iLike]: `%${make}%` };

        const assets = await Asset.findAll({ where: whereClause });
        res.render('Asset/asset', { assets });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching assets' });
    }
})


router.get('/add', (req, res) => {
    res.render('Asset/assetAdd');
})


router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const asset = await Asset.findOne({ where: { id } });
        if (!asset) {
            return res.status(404).render('404', { message: "Asset not found" })
        } else {
            res.render('Asset/assetEdit', { asset })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error while fetching asset for edit" })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { serialNo, name, model, make, status, branch, value } = req.body
    try {
        const asset = await Asset.findOne({ where: { id } });
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" })
        } 

        if (!serialNo || !name || !model || !make || !status || !branch || !value) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const assetUpdate = await asset.update({ serialNo, name, model, make, status, branch, value });
        res.status(200).json({ assetUpdate, message: "Asset Updated Successfully" })
    } 
   
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating asset' });
    }
})

module.exports = router;
