const mongoose = require('mongoose')
const { exists } = require('../models/employee')
const ReparationData = require('../models/reparationData')

const service = require('../services')

function newReparation(req, res) {
    const reparationData = new ReparationData({
        name: req.body.name,
        surname: req.body.surname,
        clientDni: req.body.clientDni,
        phone: req.body.phone,
        clientEmail: req.body.clientEmail,
        address: req.body.address,
        inDate: req.body.inDate,
        outDate: req.body.outDate,
        price: req.body.price,
        description: req.body.description,
        brand: req.body.brand,
        model: req.body.model,
        matriculationDate: req.body.matriculationDate,
        reparationNumber: req.body.reparationNumber,
        reparationImage: req.body.reparationImage,
        insurance: req.body.insurance,
    })

    try {

        reparationData.save((err) => {

            if (err) {
                res.status(500).send({ message: `There has been an error creating the new reparation: ${err}` })

            } else (
                res.status(200).send({
                    message: `The reparation ${reparationData.name}, has been created`,
                })
            )
        })

    } catch (error) {
        res.status(500).send({ message: `There has been an error creating the new reparation: ${error}` })

    }
}

function getReparations(req, res) {

    try {
        ReparationData.find((err, reparations) => {
            if (err) {

                res.status(500).send({ message: `There has been an error getting the reparation: ${err}` })
            } else {
                res.status(200).send({ reparations })
            }
        })
    } catch (error) {

        if (ReparationData.length == 0) {
            return res.status(404).send({ message: `There is not any reparation` })
        } else {
            res.status(500).send({ message: `There has been an error getting the reparation: ${error}` })
        }
    }
}
function getActiveReparations(req, res) {

    try {
        ReparationData.find({ outDate: { $exists: true } }, (err, reparations) => {
            if (err) {

                res.status(500).send({ message: `There has been an error getting the reparation: ${err}` })
            } else {
                res.status(200).send({ reparations })
            }
        })
    } catch (error) {

        if (ReparationData.length == 0) {
            return res.status(404).send({ message: `There is not any reparation` })
        } else {
            res.status(500).send({ message: `There has been an error getting the reparation: ${error}` })
        }
    }
}

function getOneReparation(req, res) {

    let reparationId = req.params.reparationId

    try {
        ReparationData.findById(reparationId, (err, reparations) => {
            if (err) {

                res.status(500).send({ message: `There has been an error getting the reparation: ${err}` })
            } else if (!reparations) {

                res.status(404).send({ message: `The reparation does not exist` })
            } else {

                res.status(200).send({ reparations })
            }
        })
    } catch (error) {
        res.status(500).send({ message: `There has been an error getting the reparation: ${error}` })
    }
}

function updateReparation(req, res) {
    let reparationId = req.params.reparationId
    let update = req.body

    try {
        ReparationData.findByIdAndUpdate(reparationId, update, (err, reparationUpdated) => {
            if (err) {
                res.status(500).send({ message: `Error updating the reparation: ${err}` })

            } else {
                res.status(200).send({ reparation: reparationUpdated })
            }
        })
    } catch (error) {
        res.status(500).send({ message: `Error updating the reparation: ${error}` })
    }
}

function deleteReparation(req, res) {
    let reparationId = req.params.reparationId

    ReparationData.findById(reparationId, (err, reparation) => {

        if (err) {
            res.status(500).send({ message: `There has been an error removing the employee: ${err}` })
        } else {
            ReparationData.remove(err => {
                if (err) res.status(500).send({ message: `There has been an error removing the employee: ${err}` })
                res.status(200).send({ message: `${reparationId} has been removed` })
            })
        }
    })
}

module.exports = {
    newReparation,
    getReparations,
    getOneReparation,
    updateReparation,
    deleteReparation,
    getActiveReparations
}