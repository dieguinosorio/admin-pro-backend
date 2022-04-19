const { getModel } = require('./models')
const  fs = require('fs')

const actualizarImagen = async (tipo,id,nombreArchivo) =>{

  const { modelo } = getModel(tipo)
  const datoModel = await modelo.findById(id);

  if(!datoModel){
    console.log(`El id ${id} ${tipo} no es valido o no existe`)
    return false
  }

  const oldPath = `uploads/${tipo}/${datoModel.img}`

  if(fs.existsSync(oldPath) && fs.statSync(oldPath).isFile()){
    //Borrar img anterior
    fs.unlinkSync(oldPath)
  }

  datoModel.img = nombreArchivo;
  await datoModel.save();
  return datoModel;

}

module.exports = {
  actualizarImagen
}
