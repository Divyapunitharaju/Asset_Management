const Employee=require('../model/employee')
const Asset=require('../model/asset')
const IssueTransaction=require('../model/issueTransaction')
const ScrapTransaction=require('../model/scrapTransaction')
const ReturnTransaction=require('../model/returnTransaction')

Employee.hasMany(IssueTransaction, { foreignKey: 'employeeId' });
IssueTransaction.belongsTo(Employee, { foreignKey: 'employeeId' });

Asset.hasMany(IssueTransaction, { foreignKey: 'assetId' });
IssueTransaction.belongsTo(Asset, { foreignKey: 'assetId' });

Asset.hasMany(ScrapTransaction, { foreignKey: 'assetId' });
ScrapTransaction.belongsTo(Asset, { foreignKey: 'assetId' })

Employee.hasMany(ReturnTransaction, { foreignKey: 'employeeId' });
ReturnTransaction.belongsTo(Employee, { foreignKey: 'employeeId' });

Asset.hasMany(ReturnTransaction, { foreignKey: 'assetId' })
ReturnTransaction.belongsTo(Asset, { foreignKey: 'assetId' })


module.exports = { Employee, IssueTransaction, Asset, ScrapTransaction,ReturnTransaction }
