const jwt = require('jsonwebtoken')
const { JWT_SECRET_ENV } = process.env
const generteJWToken = (id) =>{
  return new Promise((resolve,reject)=>{
    const payload = {
      uid:id
    }
  
    jwt.sign(payload,JWT_SECRET_ENV,{ 
      expiresIn:'12h' 
    },(err,token)=>{
      if(err){
        console.log(err)
        reject('No se pudo generar el JWT token')
      }
      else{
        resolve(token)
      }
    })
  })
}

module.exports = { generteJWToken } 
