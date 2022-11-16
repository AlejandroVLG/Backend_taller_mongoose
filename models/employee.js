const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const EmployeeSchema = new Schema({
    name: String,
    surname: String,
    dni: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    age: String,
    genre: { type: String, enum: ['male', 'female',] },
    contractDate: Date,
    contractType: String,
    employment: String,
    phoneExtension: String,
    employeeImage: String,
    accesLevel: { type: String, enum: ['1', '2', '3', '4'] },
    bankAccount: { type: String, unique: true },
})

EmployeeSchema.pre('save', (next) => {
    let user = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

EmployeeSchema.methods.gravatar = function () {
    if (!this.email) return 'https://gravatar.com/avatar/?s=2006d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=2006d=retro`
}

module.exports = mongoose.model('Employee', EmployeeSchema)