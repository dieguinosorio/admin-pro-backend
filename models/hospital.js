const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    usuario:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'Usuario'
    },
},{collection:'hospitales'})

HospitalSchema.method('toJSON',function(){
  const {__v,_id,...object} = this.toObject()
  object.id = _id
  return object
})

module.exports= model('Hospital',HospitalSchema)
