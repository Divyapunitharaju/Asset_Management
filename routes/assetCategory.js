const express = require('express')
const route = express.Router()
const AssetCategory = require('../model/assetCategory')


route.post('/', async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: 'Asset category name is required' });
    }
    try {
        const asset = await AssetCategory.create({ name })
        res.status(200).json({ asset, message: "Asset Category is created" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while creating asset category' })
    }
})


route.get('/', async (req, res) => {
    try {
        const assetCategories = await AssetCategory.findAll()
        res.status(200).render('AssetCategory/assetCategory', { assetCategories })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching asset categories' })
    }
})


route.get('/add', (req, res) => {
    res.status(200).render('AssetCategory/assetCategoryAdd')
})


route.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const assetCategory = await AssetCategory.findOne({ where: { id } })

        if (!assetCategory) {
            return res.status(404).json({ message: 'Asset Category not found' })
        }

        res.status(200).json(assetCategory)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching asset category by ID' })
    }
})


route.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const assetCategory = await AssetCategory.findOne({ where: { id } })

        if (!assetCategory) {
            return res.status(404).json({ message: 'Asset Category not found' })
        }
        if (!name) {
            return res.status(404).json({ message: 'Name is required' })
        }
        if(assetCategory.name === name){
            return res.status(404).json({ message: 'No Changes made in Asset Category' })
        }
        await assetCategory.update({ name })
        res.status(200).json({assetCategory,message:"Asset Category is updated"})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while updating asset category' })
    }
})


route.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const assetCategory = await AssetCategory.findOne({ where: { id } })

        if (!assetCategory) {
            return res.status(404).render('404', { message: 'Asset Category not found' })
        }

        res.status(200).render('AssetCategory/assetCategoryEdit', { assetCategory })
    } catch (err) {
        console.error(err)
        res.status(500).render( { message: 'Error while fetching asset category for editing' })
    }
})

module.exports = route
