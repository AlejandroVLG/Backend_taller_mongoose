const { model } = require("mongoose")

const express = require('express')
const api = express.Router()

api.get('/', (req, res) => {
    res.send('Hola que tal soy colosal')
})

module.exports = api