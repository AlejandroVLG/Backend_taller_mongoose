const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DatosReparacionSchema = new Schema({
    nombre: String,
    apellidos: String,
    dni: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true },
    direccion: String,
    fechaEntrada: { type: Date, default: Date.now },
    fechaSalida: { type: Date, default: Date.now() },
    precio: String,
    marca: Number,
    modelo: String,
    añoMatriculacion: Date,
    imagenReparacion: URL,
    aseguradora: String
})

module.exports = mongoose.model('DatosReparacion', DatosReparacionSchema)