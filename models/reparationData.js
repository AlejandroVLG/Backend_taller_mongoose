const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoincrement = require('simple-mongoose-autoincrement')

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
    reparationNumber: Number,
    reparationImage: String,
    insurance: String
})
ReparationDataSchema.plugin(autoincrement, { field: 'reparationNumber' })

module.exports = mongoose.model('ReparationData', ReparationDataSchema)