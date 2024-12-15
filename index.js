const express = require('express');
const app = express();
const db = require('./db/db');
const path = require('path');
const cookieParser = require('cookie-parser')
const authenticateUser=require('./middleware/authenticate')

require('./model/index')

const assetCategoryRoute = require('./routes/assetCategory')
const assetRoute = require('./routes/asset')
const stockViewRoute = require('./routes/stockView');
const employeeRoute = require('./routes/employee');
const issueRoute = require('./routes/issue');
const returnRoute = require('./routes/return');
const scrapRoute=require('./routes/scrap')
const history=require('./routes/history')
const userRoute=require('./routes/user')



app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
const cors = require("cors")
app.use(cors())


app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

db.sync({ alter: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err))

app.use('/user',userRoute)
app.use('/assets',authenticateUser, assetRoute)
app.use('/assetCategories',authenticateUser, assetCategoryRoute)
app.use('/stock',authenticateUser, stockViewRoute)
app.use('/employees',authenticateUser, employeeRoute)
app.use('/issue',authenticateUser, issueRoute)
app.use('/return',authenticateUser, returnRoute);
app.use('/scrap',authenticateUser,scrapRoute)
app.use('/assetHistory',authenticateUser,history)



// app.use((req, res) => {
//     res.status(404).send('Page not found')
// })


app.listen(3000, () => {
    console.log("Server is running")
})
