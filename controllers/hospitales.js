
const { response } = require('express')
const Hospital = require('../models/hospital')
const hospitalesController = {
  async getHospitals(req,res=response){
    try{
      const hospitales = await Hospital.find({},'nombre id')
      .populate('usuario','nombre email img')
      res.status(200).json({
        ok:true,
        hospitales
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        ok:true,
        msg:"Ocurrio un error, revisar logs"
      })
    }
  },

  async createHospitals(req,res=response){
    const hospital =  new Hospital({usuario:req.uid,...req.body})
    try{
      await hospital.save()
      res.status(200).json({
        ok:true,
        msg: `El hospital ${hospital.nombre}, ha sido creado correctamente`,
        hospital
      })
    }
    catch(error){
      console.log(error)
      res.status(500).json({
        ok:false,
        msg:"Ocurrio un error al crear el hospital, revisar logs"
      })
    }
    
  },

  async updateHospitals(req,res=response){
    const { id } = req.params;
    try{
      const hospital = await Hospital.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json({
        ok:true,
        hospital
      })
    }
    catch(error){
      res.status(500).json({
        ok:false,
        msg:'Ocurrio un error, revisar logs'
      })
    }
  },

  deleteHispitals(req,res=response){

  }
}

module.exports = hospitalesController
