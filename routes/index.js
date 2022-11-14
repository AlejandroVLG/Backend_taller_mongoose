const express = require('express')
const api = express.Router()
const employeeController = require('../controllers/employeeController')
const reparationDataController = require('../controllers/ReparationDataController')
const auth = require('../middlewares/auth')

api.get('/', (req, res) => {
    res.send('Bienvenido al taller de Alejandro')
})

api.get('/employees', employeeController.getEmployees)
api.post('/newEmployee', employeeController.signUp)
api.post('/login', employeeController.signIn)
api.put('/updateEmployee/:employeeId', employeeController.updateEmployee)
api.delete('/removeEmployee/:employeeId', employeeController.deleteEmployee)

api.get('/showReparations', reparationDataController.getReparations)
api.get('/showOneReparation/:id', reparationDataController.getOneReparation)
api.post('/newReparation', reparationDataController.newReparation)
api.put('/updateReparation/:id', reparationDataController.updateReparation)
api.delete('/deleteReparation/:id', reparationDataController.deleteReparation)

module.exports = api