const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrabajadorSchema = new Schema({
    nombre: String,
    apellidos: String,
    dni: String,
    email: String,
    edad: String,
    genero: String,
    fechaContratacion: String,
    tipoDeContrato: String,
    cargoEnLaEmpresa: String,
    cuentaBancaria: String
})

module.exports = mongoose.model('Trabajador', TrabajadorSchema)