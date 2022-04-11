const { response } = require('express')
const Usuario = require('../models/usuarios')
const { generteJWToken } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-verify')
const loginController = {
    async login(req, res = response) {
        try {
            const { email } = req.body
            const userDb = await Usuario.findOne({ email })
                //Generate JWT token
            const token = await generteJWToken(userDb.id)

            res.status(200).json({
                ok: true,
                token
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Ocurrio un error inesperado, valida los logs'
            })
        }

    },

    async loginGoogle(req, res) {
        try {
            const tokenGoogle = req.body.token
            const { name, email, picture } = await googleVerify(tokenGoogle)
            const existUser = await Usuario.findOne({ email })
            let usuario
            if (!existUser) {
                usuario = new Usuario({
                    nombre: name,
                    email,
                    password: '@@@',
                    google: true,
                    img: picture
                });
            } else {
                usuario = existUser;
                usuario.google = true;
            }
            await usuario.save()
            const token = await generteJWToken(usuario.id);

            res.json({
                ok: true,
                token
            })
        } catch (error) {
            console.log(error)
            res.status(401).json({
                ok: false,
                msg: "Token incorrecto"
            })
        }

    },

    async renewToken(req, res = response) {
        try {
            const { id } = req.uid
            const token = await generteJWToken(id);
            res.json({
                ok: true,
                token
            })
        } catch (error) {
            res.json({
                ok: false,
                msg: "Id usuario o token invalido"
            })
        }
    }
}

module.exports = {
    loginController
}