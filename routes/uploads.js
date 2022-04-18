/*
  Rutas : subir archivos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/jwt/validar-jwt');
const { validarUploadImg } = require('../middlewares/validar_subida_img')
const uploadsController = require('../controllers/uploads');
const fileUpload = require('express-fileupload');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Configurar subida de archivos
router.use(fileUpload())

router.put('/:tipo/:id', [
    validarJWT,
    check('tipo', 'El tipo no puede ir vacio').not().isEmpty(),
    check('id', 'El id no puede ir vacio').not().isEmpty(),
    check('id', 'El id debe ser valido').isMongoId(),
    validarCampos,
    validarUploadImg
], uploadsController.fileUpload)

router.get('/:tipo/:img', [
    check('tipo', 'El tipo no puede ir vacio').not().isEmpty(),
    check('img', 'El nombre de la imagen no puede estar vacio').not().isEmpty(),
    validarCampos,
], uploadsController.getImg)

module.exports = router