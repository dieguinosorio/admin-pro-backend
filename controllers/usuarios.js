
const Usuario = require('../models/usuarios')
const { response } = require('express')
const bcrypt  = require('bcryptjs')
const { generteJWToken } = require('../helpers/jwt')

//Closure para definir todas las funciones encapsuladas
const usuariosController = {

  async getUsers(req, resp = response){
    const usuarios = await Usuario.find({},'id nombre email password google');
    resp.json({
      ok: true,
      usuarios,
      uid:req.uid
    })
  },

  async createUser(req,resp = response){
    const {email,password} = req.body

    try{
      const existUser = await Usuario.findOne({email})
      if(existUser){
        return resp.status(400).json({
          ok: false,
          msg: `No se inserto el usuario por que el email ${email} ya existe en la base de datos.`
        })
      }

      const usuario = await new Usuario(req.body);
      //Enciptar password
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password,salt)
      usuario.save();

      //Generate JWT token
      const token = await generteJWToken(usuario.id)

      resp.json({
        ok: true,
        usuario,
        token
      })
      
    }
    catch(error){
      console.log(error)
      resp.status(500).json({
        ok:false,
        msg:'Error inesperado, revisar logs'
      })
    }
    
  },

  async updateUser(req,res = response){
    const { id } = req.params;
    const userDb = await Usuario.findById(id);
    if(!userDb){
      return res.json({
        ok:false,
        msg:"No existe un usuario con el id indicado"
      })
    }
    const {password,google,email,...campos} = req.body;
    if(userDb.email !== email){
      const emailExist = await Usuario.findOne({email})
      if(emailExist){
        return res.status(400).json({
          ok: false,
          msg: `No se actualizo el usuario por que el email ${email} ya existe en la base de datos.`
        })
      }
    }
    campos.email = email
    try{
      const usuarioUpdate = await Usuario.findByIdAndUpdate(id,campos,{new:true});
      res.json({
        ok:true,
        usuario:usuarioUpdate
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        ok:false,
        msg:'Error inesperado, revisar logs'
      })
    }
  },

  async deleteUser(req,res=response){
    const { id } = req.params
    const userDb = await Usuario.findById(id);
    if(!userDb){
      return res.json({
        ok:false,
        msg:"No existe un usuario con el id indicado"
      })
    }
    try{
      const userDelete = await Usuario.findByIdAndDelete(id);
      res.json({
        ok:true,
        usuario:userDelete
      })
    }
    catch(error){
      console.log(error)
      res.json({
        ok:false,
        msg:'Ocurrio un error inesperado, revisar logs'
      })
    }
  }

}
module.exports = usuariosController

