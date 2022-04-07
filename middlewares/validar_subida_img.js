const { validationResult } = require('express-validator')
const { getNameModels } = require('../helpers/models')

const validarUploadImg = (req,res = response,next) =>{
  const { tipo } =  req.params
  const tiposValidos = getNameModels()
  const extValidas = ['jpg','jpeg','png','gif']

  if(!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok:false,
      msg:`El tipo '${ tipo }' no es permitido debe ser ${tiposValidos}`
    })
  } 

  
  if(!req.files || !Object.keys(req.files)){
    return res.status(400).json({
      ok:false,
      msg:`No se ha seleccionado ninguna imagen`
    })
  }

  const { imagen } = req.files

  const nombreCortado = imagen.name.split('.');
  const ext = nombreCortado.pop();
  if(!extValidas.includes(ext)){
    return res.status(400).json({
      ok:false,
      msg:`La extención del archivo '${ext}' no es valida debe ser ${extValidas}`
    })
  }

  req.imagen = imagen
  req.ext = ext
  
  next();
}


module.exports = {
  validarUploadImg,
}
