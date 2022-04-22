const{response} =  require('express')
const { Models } = require('../helpers/models')
const BusquedaGeneralController = {
  async searchData(req,res=response){
    try{
      
      const { busqueda } =  req.params
      const { usuarios,medicos,hospitales } = Models
      const regExp = new RegExp(busqueda,'i')
      const [ users,doctors,hospitals] = await Promise.all([
        usuarios.modelo.find({nombre:regExp}).populate([...usuarios.populate]),
        medicos.modelo.find({nombre:regExp}).populate([...medicos.populate]),
        hospitales.modelo.find({nombre:regExp}).populate([...hospitales.populate])
      ])
      res.json({
        ok:true,
        msg:'desde busqueda general',
        data:{
          users,
          doctors,
          hospitals
        }
      })
    }
    catch(err){
      console.log(err)
      res.status(500).json({
        ok:false,
        msg:'Ocurrio un error, revisar logs'
      })
    }
  },

  async searchByModel(req,res=response){
    try {
      const {model,busqueda} = req.params
      
      const keyObj = Object.keys(Models).filter(filt => filt === model)
      if(!keyObj.length || !model ){
        return res.status(400).json({
          ok:false,
          msg:`El modelo no existe con '${model}' debe ser ${Object.keys(Models)}`
        })
      }
      const regExp = new RegExp(busqueda,'i')
      const { modelo,populate } = Models[keyObj]
      console.log({modelo,model})
      const result = await modelo.find({nombre:regExp}).populate([...populate])
      res.json({
        ok:true,
        result
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok:false,
        msg:'Ocurrio un error, revisar logs'
      })
    }
  }
}

module.exports = BusquedaGeneralController
