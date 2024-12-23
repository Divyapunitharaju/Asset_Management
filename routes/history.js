const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const IssueTransaction = require('../model/issueTransaction')
const ReturnTransaction = require('../model/returnTransaction')
const ScrapTransaction = require('../model/scrapTransaction')
const Employee=require('../model/employee')


route.get('/history/:assetId', async (req, res) => {
  const { assetId } = req.params;
  try {
   const asset = await Asset.findOne({ where: { id :assetId } });
   if (!asset) {
    return res.status(404).json('Asset not found')
   }
   
   const issueTransactions = await IssueTransaction.findAll({ where: { assetId} })
   const returnTransactions = await ReturnTransaction.findAll({ where: { assetId } })
   const scrapTransactions = await ScrapTransaction.findAll({ where: { assetId } })
   console.log('Issue Transactions:', issueTransactions);
   console.log('Return Transactions:', returnTransactions);
   console.log('Scrap Transactions:', scrapTransactions)

   res.render('history', {asset,issueTransactions,returnTransactions,scrapTransactions})
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching asset history' });
  }
})

module.exports=route




