const { response } = require('express')
const Medicos = require('../models/medicos');
const medicosController = {
    async getDoctors(req, res = response) {
        try {
            const medicos = await Medicos.find({}, 'nombre hospital')
                .populate('usuario', 'nombre email img')
                .populate('hospital', 'nombre')
            res.status(200).json({
                ok: true,
                medicos
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: true,
                msg: "Ocurrio un error, revisar logs"
            })
        }
    },
    async createDoctor(req, res = response) {
        const newDoctor = new Medicos({ usuario: req.uid, ...req.body });
        try {
            await newDoctor.save();
            res.status(200).json({
                ok: true,
                doctor: newDoctor
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: true,
                msg: 'Ocurrio un error, revisar logs'
            })
        }
    },
    async updateDoctor(req, res = response) {
        const { id } = req.params;
        const cambiosMedico = {
            ...req.body,
            usuario: req.uid
        }
        try {
            const doctor = await Medicos.findByIdAndUpdate(id, cambiosMedico, { new: true })
            res.status(200).json({
                ok: true,
                doctor
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Ocurrio un error, revisar logs'
            })
        }

    },
    async deleteDoctor(req, res = response) {
        const { id } = req.body;
        const medico = await Medicos.findOneAndDelete(id)
        if (!medico) {
            return res.status(200).json({
                ok: false,
                msg: 'medico no encontrado'
            })
        }
        res.status(200).json({
            ok: true,
            medico
        })
    }
}

module.exports = medicosController