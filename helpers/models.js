const Usuario =  require('../models/usuarios')
const Medico = require('../models/medicos')
const Hospital = require('../models/hospital')
const Models = {
  'usuarios':{
    modelo:Usuario,
    populate:[]
  },
  'medicos':{
    modelo:Medico,
    populate:['usuario','hospital']
  },
  'hospitales':{
    modelo:Hospital,
    populate:['usuario']
  }
}

const getNameModels = () =>{
  return Object.keys(Models);
}

const getModel = (modelo) =>{
  return Models[modelo]
}


module.exports = {
  Models,
  getNameModels,
  getModel
}
