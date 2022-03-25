const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { dbConection } = require('./database/config');

//console.log(process.env) muestra todas las config . env de la aplicacion

const { PORT_ENV } = process.env

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors())

//Base de datos
dbConection();

app.get('/', (req, resp) => {
    resp.json({
        ok: true,
        status: 200
    })
})

app.listen(PORT_ENV, () => {
    console.log(`Hola desde puerto ${PORT_ENV}`)
})