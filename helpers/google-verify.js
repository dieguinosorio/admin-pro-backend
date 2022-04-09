const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_ID_ENV
const client = new OAuth2Client(CLIENT_ID);
const googleVerify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const { name, email, picture } = payload
    return {
        name,
        email,
        picture
    }
}

module.exports = {
    googleVerify
}