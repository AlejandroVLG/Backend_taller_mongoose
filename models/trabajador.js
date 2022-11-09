const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrabajadorSchema = new Schema({
    nombre: String,
    apellidos: String,
    dni: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true },
    edad: String,
    genero: String,
    fechaContratacion: Date,
    tipoDeContrato: Date,
    cargoEnLaEmpresa: String,
    cuentaBancaria: { type: String, unique: true },
})

module.exports = mongoose.model('Trabajador', TrabajadorSchema)