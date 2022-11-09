const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccesoEmpleadoSchema = new Schema({
    nombre: String,
    apellidos: String,
    cargoEnLaEmpresa: String,
    nivelAcceso: String,
    password: String,
    imagen: String,
    extensionTelefonica: String
})

module.exports = mongoose.model('AccesoEmpleado', AccesoEmpleadoSchema)