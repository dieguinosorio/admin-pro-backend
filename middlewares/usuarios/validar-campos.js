
const {response} = require('express');
const { validationResult } = require('express-validator')
const Usuario = require('../../models/usuarios')

const validarCampos = (req,res = response,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      ok:false,
      errors: errors.array()
    });
  }

  next();
}

const emailRegistrado = async(req,res = response,next)=>{
  const { email } = req.body
  const existUser = await Usuario.findOne({email})
  if(existUser){
    return res.status(400).json({
      ok: false,
      msg: `No se inserto el usuario por que el email ${email} ya existe en la base de datos.`
    })
  }
  next();
}

module.exports = {
  validarCampos,
  emailRegistrado
}
