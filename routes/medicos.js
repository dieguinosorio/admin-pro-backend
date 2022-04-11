/*
  Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { validarJWT } = require('../middlewares/jwt/validar-jwt');
const medicosController = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', [], medicosController.getDoctors)

router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre no puede ir vacio.').not().isEmpty(),
    check('hospital', 'El campo hospital no puede ir vacio.').not().isEmpty(),
    check('hospital', 'El hospital debe ser un id valido.').isMongoId(),
    validarCampos
], medicosController.createDoctor)

router.put('/:id', [
    validarJWT,
    check('nombre', 'El campo nombre no puede ir vacio.').not().isEmpty(),
    check('hospital', 'El campo hospital no puede ir vacio.').not().isEmpty(),
    check('hospital', 'El hospital debe ser un id valido.').isMongoId(),
    validarCampos
], medicosController.updateDoctor)

router.delete('/:id', [validarJWT], medicosController.deleteDoctor)

module.exports = router;