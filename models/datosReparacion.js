const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DatosReparacionSchema = new Schema({
    nombre: String,
    apellidos: String,
    dni: String,
    email: String,
    direccion: String,
    fechaEntrada: String,
    fechaSalida: String,
    precio: String,
    marca: Number,
    modelo: String,
    añoMatriculacion: String,
    imagen: URL,
    aseguradora: String
})

module.exports = mongoose.model('DatosReparacion', DatosReparacionSchema)