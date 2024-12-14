const express = require('express')
const route = express.Router()
const { Op } = require('sequelize')
const Employee = require('../model/employee')


route.post('/', async (req, res) => {
    const { name, position, status } = req.body
    try {
        if (!name || !position || !status) {
            return res.status(400).json({ message: 'All fields are required' })
        }

       const employee= await Employee.create({ name, position, status })
       res.status(200).json({ employee, message: 'Employee is created' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while creating employee' })
    }
})


// route.get('/',(req,res)=>{
//    const employees = Employee.findAll()
//    res.status(200).render('Employee/employee', { employees })
// })

route.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll()
        res.status(200).render('Employee/employee', { employees })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching asset categories' })
    }
})
route.get('/', async (req, res) => {
    try {
        const employees = await Employee.findAll()
        res.status(200).json(employees)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching employees' })
    }
})

route.get('/search', async (req, res) => {
    const { status, name } = req.query
    const whereClause = {}

    try {
        if (status) {
            whereClause.status = status
            // whereClause.status = { [Op.iLike]: status }
        }
        if (name) {
            whereClause.name = { [Op.iLike]: `%${name}%` }
        }
        console.log(req.query)
        console.log(whereClause)

        const employees = await Employee.findAll({ where: whereClause })
        res.json(employees)
        // res.status(200).render('Employee/employee', { employees })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error while fetching employees' })
    }
})

route.get('/add', (req, res) => {
    res.status(200).render('Employee/employeeAdd')
})

// route.get('/edit/:id', async (req, res) => {
//     const { id } = req.params

//     try {
//         const employee = await Employee.findOne({ where: { id } })

//         if (!employee) {
//             return res.status(404).json({message:"Employee not found"})
//         }

//         res.status(200).render('Employee/employeeEdit', { employee })
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ message: 'Error while fetching employee for edit' })
//     }
// })

route.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const employee = await Employee.findOne({ where: { id } })
        if (!employee) {
            return res.status(404).render('404', { message: "Employee not found" })
        }
        res.status(200).render('Employee/employeeEdit', { employee })
    } catch (err) {
        console.error("Error fetching employee for edit", err)
        res.status(500).json({ message: "Error while fetching employee for edit" })
    }
});



route.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, position, status } = req.body

    try {
        const employee = await Employee.findOne({ where: { id } })

        if (!employee) {
            return res.status(404).json({message:"Employee not found"})
        }

        if (!name || !position || !status) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (employee.name === name && employee.position === position && employee.status === status) {
            return res.status(400).json({ message: "No changes made to the employee data" })
        }

        const updatedEmployee=await employee.update({ name, position, status })
        res.status(200).json({ message: "Employee updated successfully!", updatedEmployee })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while updating employee' })
    }
})

module.exports = route