const mongoose = require('mongoose')
const Employee = require('../models/employee')
const service = require('../services')

function signUp(req, res) {

    const employee = new Employee({
        employeeName: req.body.employeeName,
        employeeSurname: req.body.employeeSurname,
        dni: req.body.dni,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        genre: req.body.genre,
        contractDate: req.body.contractDate,
        contractType: req.body.contractType,
        employment: req.body.employment,
        phoneExtension: req.body.phoneExtension,
        employeeImage: req.body.employeeImage,
        accesLevel: req.body.accesLevel,
        bankAccount: req.body.bankAccount,
        reparations: req.body.reparations
    })

    try {
        employee.save((err) => {

            if (err) return res.status(500).send({ message: `There has been an error creating the new employee: ${err}` })

            return res.status(200).send({
                message: `The employees ${employee.employeeName}, has been created`,
                token: service.createToken(employee)
            })
        })
    } catch (error) {

        return res.status(500).send({ message: `There has been an error creating the new employee: ${error}` })
    }
}

function signIn(req, res) {

    try {
        Employee.find(
            {
                dni: req.body.dni,
                password: req.body.password
            },
            ((err, employee) => {

                if (err) return res.status(500).send({ message: err })

                if (!employee) return res.status(404).send({ message: 'The emplooyee does not exist' })

                req.employee = employee
                res.status(200).send({
                    message: 'You have been logged succesfully',
                    token: service.createToken(employee)
                })
            })
        )
    } catch (error) {

        return res.status(500).send({ message: error })
    }
}

function getEmployees(req, res) {

    try {
        Employee.find({}, (err, employees) => {

            if (err) return res.status(500).send({ message: `There has been an error getting the employees: ${err}` })

            if (employees.length == 0) return res.status(404).send({ message: `There is not any employee` })

            return res.status(200).send({ employees })

        }).populate(
            { path: 'reparations', model: 'ReparationData' }
        )
    } catch (error) {

        return res.status(500).send({ message: `There has been an error getting the employees: ${error}` })
    }
}

function getEmployeesByAge(req, res) {

    try {
        Employee.find({ age: { $gte: 45 } }, (err, employees) => {

            if (err) return res.status(500).send({ message: `There has been an error getting the employees: ${err}` })

            if (employees.length == 0) return res.status(404).send({ message: `There is not any employee` })

            return res.status(200).send({ employees })
        })
    } catch (error) {

        return res.status(500).send({ message: `There has been an error getting the employees: ${error}` })
    }
}

function updateEmployee(req, res) {

    let employeeId = req.params.employeeId
    let update = req.body

    try {
        Employee.findByIdAndUpdate(employeeId, update, (err, employeeUpdated) => {

            if (err) return res.status(500).send({ message: `Error updating the employee data: ${err}` })

            return res.status(200).send({ employee: employeeUpdated })
        })
    } catch (error) {

        return res.status(500).send({ message: `Error updating the employee data: ${error}` })
    }
}

function deleteEmployee(req, res) {

    let employeeId = req.params.employeeId

    try {
        Employee.findById(employeeId, (err, employee) => {

            if (err) return res.status(500).send({ message: `There has been an error removing the employee: ${err}` })

            employee.remove(err => {
                if (err) return res.status(500).send({ message: `There has been an error removing the employee: ${err}` })

                return res.status(200).send({ message: `${employee.name} has been removed` })
            })
        })
    } catch (error) {

        return res.status(500).send({ message: `There has been an error removing the employee: ${error}` })
    }


}

module.exports = {
    signUp,
    signIn,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployeesByAge
}