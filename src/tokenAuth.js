const {sign, verify} = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign(
        {name: user.nama, username: user.username, id:user.id, role: user.role }, "BolangSiBolang"
    );

    return accessToken
}

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) {
        return res.status(400).send({message: "User belum Login"})
    } 

    try {
        const validToken = verify(accessToken, "BolangSiBolang")
        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        return res.status(400).send({message: err})
    }
}

module.exports = {createToken, verifyToken}