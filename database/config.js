const mongoose = require('mongoose');
const { USER_ENV, PASSWORD_ENV, CLOUSTER_ENV, DB_ENV } = process.env
const dbConection = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${USER_ENV}:${PASSWORD_ENV}@${CLOUSTER_ENV}/${DB_ENV}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });
        console.log('DB online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la bd')
    }
}

module.exports = {
    dbConection
}