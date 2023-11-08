
const db = require("../db")

module.exports = {
    addNotes: (req, res) => {
        const id_pengguna = req.cookies["id-pengguna"]
        const {tanggal} = req.body
        const id_catatan = Math.floor(Math.random()*1000)
        const query = `INSERT INTO catatan VALUES (${id_catatan}, ${id_pengguna}, '${tanggal}')`
        db.query(query)
        .then(() => {
            res.status(200).send({"message": "Menambah Catatan Berhasil", "idCatatan": id_catatan})
        })
        .catch((err) => {
            res.status(200).send({"message": err})
        })
    },

    getAllNotes: (req, res) => {
        const id_pengguna = req.cookies["id-pengguna"]
        const { tanggal }  = req.params
        const query = `
            SELECT id_detail_catatan, waktu, deskripsi, status from catatan c inner join detail_catatan dc  
                on c.id_catatan = dc.id_catatan 
                where id_pengguna = ${id_pengguna} and tanggal LIKE '${tanggal}' `

        db.query(query)
        .then((result) => {
            let baik = []
            let buruk = []

            result.map((e, index) => {
                if (e.status == 1) {
                    baik.push(result[index])
                } else if (e.status == 0) {
                    buruk.push(result[index])
                }
            })

            res.status(200).send({
                kegiatanBaik: baik,
                kegiatanBuruk: buruk
            })
        }).catch ((err) => {
            console.log(err)
            res.status(400).send({message: err })
        })
    },

    addDetailNotes: (req, res) => {
        const {id_catatan, waktu, deskripsi, status} = req.body

        const id_detail_catatan = Math.floor(Math.random() * 10000)
        const query = `INSERT INTO detail_catatan (id_detail_catatan, id_catatan, waktu, deskripsi, status, createdAt) 
                        VALUES ( ${id_detail_catatan} ,${id_catatan}, '${waktu}', '${deskripsi}', ${status}, now() )`

        db.query(query)
        .then(() => {
            res.status(200).send({message: `Menambah Detail Catatan berhasil`})
        }).catch((err) => {
            res.status(400).send({message: err})
        })
    },

    updateDetailNotes: (req, res) => {
        const {idNotes} = req.params
        const {waktu, deskripsi} = req.body
        const query = `UPDATE detail_catatan set waktu = '${waktu}', deskripsi='${deskripsi}', updatedAt = now() WHERE id_detail_catatan = ${idNotes}`
    
        db.query(query)
        .then(() => {
            res.status(200).send({message: 'Memperbarui Detail Catatan Berhasil'})
        }).catch((err) => {
            res.status(400).send({message: err})
        })
    },

    deleteDetailNotes: (req, res) => {
        const {idNotes} = req.params
        const query = `DELETE FROM detail_catatan WHERE id_detail_catatan = ${idNotes}`

        db.query(query)
        .then(() => {
            res.status(200).send({message: 'Menghapus Detail Catatan Berhasil'})
        }).catch((err) => {
            res.status(400).send({message: err})
        })
    }
}