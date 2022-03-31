const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { dbConection } = require('./database/config');
const bodyParser = require('body-parser')

//console.log(process.env) muestra todas las config . env de la aplicacion
const { PORT_ENV } = process.env

//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors())

//Middleware lectura y parseo del body
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: true }))

//Midleware para definir api rutas
app.use('/api/usuarios',require('./routes/usuarios'))

app.use('/api/login',require('./routes/auth'))

//Base de datos
dbConection();



app.listen(PORT_ENV, () => {
    console.log(`Hola desde puerto ${PORT_ENV}`)
})
