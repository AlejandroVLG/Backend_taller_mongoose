const mongoose = require('mongoose')
const Employee = require('../models/employee')

const service = require('../services')

function signUp(req, res) {
    const employee = new Employee({
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        genre: req.body.genre,
        contractDate: req.body.contractDate,
        contractType: req.body.contractType,
        employment: req.body.employment,
        phoneExtension: req.body.phoneExtension,
        accesLevel: req.body.accesLevel,
        bankAccount: req.body.bankAccount,
    })

    employee.save((err) => {
        if (err) res.status(500).send({ message: `There has been an error creating the new employees: ${err}` })

        return res.status(200).send({
            message: `The employees ${employee.dni}, has been created`,
            token: service.createToken(employee)
        })
    })
}

function signIn(req, res) {
    Employee.find(
        {
            dni: req.body.dni,
            password: req.body.password
        },
        (err, employee) => {
            if (err) return res.status(500).send({ message: err })
            if (!employee) return res.status(404).send({ message: 'The emplooyees does not exist' })

            req.employee = employee
            res.status(200).send({
                message: 'You have been logged succesfully',
                token: service.createToken(employee)
            })
        })
}

function getEmployees(req, res) {
    Employee.find({}, (err, employees) => {
        if (err) {
            res.status(500).send({ message: `There has been an error getting the employees: ${err}` })

        } else {
            if (employees.length == 0) {
                return res.status(404).send({ message: `There is not any employee` })
            } else {
                res.send(200, { employees })
            }
        }
    })
}

function deleteEmployee(req, res) {
    let employeeId = req.params.employeeId

    Employee.findById(employeeId, (err, employee) => {

        if (err) {
            res.status(500).send({ message: `There has been an error removing the employee: ${err}` })
        } else {
            Employee.remove(err => {
                if (err) res.status(500).send({ message: `There has been an error removing the employee: ${err}` })
                res.status(200).send({ message: `The ${employee.name} has been removed` })
            })
        }
    })
}

module.exports = {
    signUp,
    signIn,
    getEmployees,
    deleteEmployee
}