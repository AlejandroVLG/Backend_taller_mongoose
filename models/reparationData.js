const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReparationDataSchema = new Schema({
    name: String,
    surname: String,
    dni: { type: String, unique: true, lowercase: false },
    phone: Number,
    email: { type: String, unique: true, lowercase: true },
    address: String,
    inDate: { type: Date, default: Date.now() },
    outDate: { type: Date, default: Date.now() },
    price: Number,
    brand: String,
    model: String,
    matriculationDate: Date,
    reparationImage: URL,
    insurance: String
})

module.exports = mongoose.model('ReparationData', ReparationDataSchema)