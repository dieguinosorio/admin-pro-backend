const { response } = require('express')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar_imagen');
const { validationResult } = require('express-validator');
const uploadsController = {
  
    fileUpload(req, res = response) {
        const { tipo, id } = req.params
        const { imagen, ext } = req
        try {
            const nombreArchivo = `${uuidv4()}.${ext}`
            const rutaSave = `uploads/${tipo}/${nombreArchivo}`
            imagen.mv(rutaSave, (error) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al guardar la imagen'
                    })
                }
                //Actualizar la imagen
                actualizarImagen(tipo, id, nombreArchivo)
                res.json({
                    ok: true,
                    msg: `imagen  guardada correctamente`,
                    imagen:nombreArchivo
                })
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error en el servidor, revisar logs"
            })
        }
    },

    getImg(req, res = response) {
        const { tipo, img } = req.params
        //dirname me trate a la ruta de este controller y une la nueva ruta que le estoy pasando como segundo arg y crea una sola ruta
        let pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`)
        if (!fs.existsSync(pathImg)) pathImg = path.join(__dirname, `../uploads/img-not-available.png`)
        res.sendFile(pathImg)
    }
}

module.exports = uploadsController
