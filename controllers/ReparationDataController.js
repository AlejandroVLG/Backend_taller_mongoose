const mongoose = require('mongoose')
const ReparationData = require('../models/reparationData')

const service = require('../services')

function newReparation(req, res) {
    const reparationData = new ReparationData({
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        inDate: req.body.inDate,
        outDate: req.body.outDate,
        price: req.body.price,
        brand: req.body.brand,
        model: req.body.model,
        matriculationDate: req.body.matriculationDate,
        reparationImage: req.body.reparationImage,
        insurance: req.body.insurance,
    })

    reparationData.save((err) => {
        if (err) res.status(500).send({ message: `There has been an error creating the new reparation: ${err}` })

        return res.status(200).send({
            message: `The reparation ${reparationData.name}, has been created`,
            token: service.createToken(reparationData)
        })
    })
}

module.exports = {
    newReparation
}