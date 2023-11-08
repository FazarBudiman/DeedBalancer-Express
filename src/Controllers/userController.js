const db = require('../db')
const bcrypt = require('bcrypt')
const { createToken, verifyToken } = require('../tokenAuth')



module.exports = {

    register: (req, res) => {
        const {nama, username, password} = req.body
        const id_pengguna = Math.floor(Math.random() * 1000)
        bcrypt.hash(password, 10).then((password) => {
            let query = `INSERT INTO pengguna VALUES (${id_pengguna}, '${nama}', '${username}', '${password}')`
            db.query(query)
            .then(() => {
                res.status(200).send({
                    message: "Akun pengguna berhasil dibuat"
                })
            }).catch((err) => {
                res.status(400).send({message: err})
            })    
        }).catch((err) => {
            res.status(400).send({message: err})
        })
    },

    login: (req, res) => {
        const {username, password} = req.body
        db.query(`SELECT * FROM pengguna WHERE username = '${username}'`)
        .then((result) => {
            console.log(result[0].id_pengguna)
            if (result.length != 0) {
                let passwordDb = result[0].password
                bcrypt.compare(password, passwordDb).then((match) => {
                    if (!match) {
                        res.status(400).send({message: "Password Salah"})
                    } else {
                        const accessToken = createToken(result[0]);
                        res.cookie(
                            "access-token", accessToken, {
                            maxAge: 60 * 60 * 24 * 20 * 1000,
                            httpOnly: true,}
                        )
                        res.cookie("id-pengguna", result[0].id_pengguna)

                        res.status(200).send({
                            message: 'Berhasil Login',
                            token: accessToken
                        })
                    }
                })
                
            } else {
                res.status(400).send({message: "Username salah"})
            }
        }).catch((err) => {
            res.status(400).send({message: err})
        })
    },
}