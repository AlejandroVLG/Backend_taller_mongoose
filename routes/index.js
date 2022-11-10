const express = require('express')
const api = express.Router()
const employeeController = require('../controllers/employeeController')
const auth = require('../middlewares/auth')

api.get('/', (req, res) => {
    res.send('Bienvenido al taller de Alejandro')
})

api.post('/newEmployee', employeeController.signUp)
api.post('/login', employeeController.signIn)
api.get('/employees', employeeController.getEmployees)
api.put('/updateEmployee/:employeeId', employeeController.updateEmployee)
api.delete('/removeEmployee/:employeeId', employeeController.deleteEmployee)

module.exports = api