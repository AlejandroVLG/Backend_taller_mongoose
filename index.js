const mongoose = require('mongoose')

const config = require('./config')
const app = require('./app')

mongoose.connect(config.db, (error, res) => {
    if (error) {
        return console.log(`Error al conectar a la base de datos: ${error}`)
    } else {
        console.log('Conexion a la base de datos establecida..')
    }
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
})