/*
  Ruta: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();
const { validarJWT } = require('../middlewares/jwt/validar-jwt');
const hospitalesController = require('../controllers/hospitales');

router.get('/', [], hospitalesController.getHospitals)

router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre es requerido').not().isEmpty(),
    validarCampos
], hospitalesController.createHospitals)

router.put('/:id', [validarJWT], hospitalesController.updateHospitals)

router.delete('/:id', [validarJWT], hospitalesController.deleteHospitals)

module.exports = router;
