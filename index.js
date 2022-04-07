const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { dbConection } = require('./database/config');
const bodyParser = require('body-parser')
const fileUpload  = require('express-fileupload')

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
app.use('/api/login',require('./routes/auth'))
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/hospitales',require('./routes/hospitales'))
app.use('/api/medicos',require('./routes/medicos'))
app.use('/api/busqueda',require('./routes/busqueda'))
app.use('/api/uploads',require('./routes/uploads'))


//Base de datos
dbConection();

//Directorio publico
app.use(express.static('public'))


app.listen(PORT_ENV, () => {
  console.log(`Hola desde puerto ${PORT_ENV}`)
})
