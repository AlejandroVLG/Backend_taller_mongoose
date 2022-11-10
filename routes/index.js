const express = require('express')
const api = express.Router()
const employeeController = require('../controllers/employeeController')
const auth = require('../middlewares/auth')

api.get('/', (req, res) => {
    res.send('Hola que tal soy colosal')
})

api.post('/newEmployee', employeeController.signUp)
api.post('/login', employeeController.signIn)
api.get('/employees', employeeController.getEmployees)
api.delete('/removeEmployee/:employeeId', employeeController.deleteEmployee)

module.exports = api