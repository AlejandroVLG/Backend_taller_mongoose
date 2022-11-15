const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReparationDataSchema = new Schema({
    name: String,
    surname: String,
    clientDni: String,
    phone: Number,
    clientEmail: { type: String, unique: true, lowercase: true },
    address: String,
    inDate: { type: Date, default: Date.now() },
    outDate: Date,
    price: Number,
    description: String,
    brand: String,
    model: String,
    matriculationDate: String,
    reparationNumber: String,
    reparationImage: Buffer,
    insurance: String
})

module.exports = mongoose.model('ReparationData', ReparationDataSchema)