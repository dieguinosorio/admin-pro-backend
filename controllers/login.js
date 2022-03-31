const { response } = require('express')
const Usuario = require('../models/usuarios')
const { generteJWToken } = require('../helpers/jwt')
const loginController = {
  async login(req,res=response){
    try{
      const { email } = req.body
      const userDb = await Usuario.findOne({email})
      //Generate JWT token
      const token = await generteJWToken(userDb.id)

      res.status(200).json({
        ok:true,
        token
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        ok:false,
        msg:'Ocurrio un error inesperado, valida los logs'
      })
    }
    
  }
}

module.exports = {
  loginController
} 
