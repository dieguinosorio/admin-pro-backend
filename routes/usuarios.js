/*
  Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos, emailRegistrado } = require('../middlewares/usuarios/validar-campos')
const router = Router();
const usuariosController = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/jwt/validar-jwt');

router.get('/', [validarJWT], usuariosController.getUsers)

router.post('/', [
    check('nombre', 'El campo nombre no puede estar vacio').not().isEmpty(),
    check('password', 'La contraseña no puede estar vacia').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    validarCampos,
    emailRegistrado
], usuariosController.createUser)

router.put('/:id', [
    validarJWT,
    check('nombre', 'El campo nombre no puede estar vacio').not().isEmpty(),
    check('password', 'La contraseña no puede estar vacia').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
], usuariosController.updateUser)

router.delete('/:id', [validarJWT], usuariosController.deleteUser)

module.exports = router;