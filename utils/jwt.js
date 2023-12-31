const jwt = require('jsonwebtoken')

async function jwtToken(payload) {
    const token = await jwt.sign({ id: payload }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME })
    return token
}

module.exports = { jwtToken }