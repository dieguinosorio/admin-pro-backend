const { Router } = require('express')
const { check } = require('express-validator')
const { loginController } = require('../controllers/login')
const { validarLogin } = require('../middlewares/login/validar-login')
const router = Router();

router.post('/',[
  check('email','El email no puede estar vacio o debe ser valido').not().isEmpty().isEmail(),
  check('password', 'El password no puede estar vacio').not().isEmpty(),
  validarLogin
],loginController.login)

router.post('/google',[
  check('toke', 'El token google no puede estar vacio').not().isEmpty(),
  validarLogin
],loginController.loginGoogle)

module.exports = router
