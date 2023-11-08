const app = require('express')
const notes = app.Router()
const controller = require('../Controllers/notesController')
const {verifyToken} = require('../tokenAuth')

notes.post("/", verifyToken, controller.addNotes )
notes.get("/:tanggal", verifyToken, controller.getAllNotes )

notes.post("/detail/", verifyToken, controller.addDetailNotes)
notes.put("/detail/:idNotes", verifyToken, controller.updateDetailNotes)
notes.delete("/detail/:idNotes", verifyToken, controller.deleteDetailNotes)

module.exports = notes