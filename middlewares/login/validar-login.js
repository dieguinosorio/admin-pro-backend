const { validationResult } = require('express-validator')
const Usuario = require('../../models/usuarios')
const bcrypt = require('bcryptjs')


const validarLogin = async (req,res,next) =>{
  const errors = validationResult(req);
  const { email, password } = req.body

  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      ok:false,
      errors: errors.array()
    });
  }
  const userDb = await Usuario.findOne({email})
  
  if(!userDb){
    return res.status(400).json({ 
      ok:false,
      errors: [{
        ok:false,
        msg:"El email no encontrado"
      }]
    });
  }

  if(!bcrypt.compareSync(password,userDb.password)){
    return res.status(400).json({ 
      ok:false,
      errors: [{
        ok:false,
        msg:"contraseña incorrecta"
      }]
    });
  }

  next();
}

module.exports = {
  validarLogin
}
