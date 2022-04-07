/*
  Rutas : Busqueda general del aplicativo
*/

const { Router } = require('express');
const { check } = require('express-validator');
const BusquedaGeneralController = require('../controllers/busqueda_general');
const { validarJWT } = require('../middlewares/jwt/validar-jwt');


const router = Router();

router.get('/:busqueda',[validarJWT], BusquedaGeneralController.searchData)

router.get('/collection/:model/:busqueda',[validarJWT], BusquedaGeneralController.searchByModel)

module.exports = router
