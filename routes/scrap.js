const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const Employee = require('../model/employee')
const ReturnTransaction = require('../model/returnTransaction')



route.get('/', async (req, res) => {
    try {
      const assets = await Asset.findAll({ where: { status: 'Available' } });
      res.render('scrap', { assets });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching assets' });
    }
  })

  route.post('/', async (req, res) => {
    const { assetId, scrapReason } = req.body;
    try {
      if (!assetId || !scrapReason) {
        return res.status(404).json({ message: 'All fields are required' });
      }
      const asset = await Asset.findOne({ where: { id: assetId } });
      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      if (asset.status !== 'Available') {
        return res.status(404).json({ message: 'Asset is not available' });
      }
      await Asset.update({ status: 'Obsolete', scrapReason: scrapReason }, { where: { id: assetId } });
      res.redirect('/assets');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error scrapping asset' });
    }
  })

  module.exports=route