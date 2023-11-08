const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')
const cookieParser = require('cookie-parser')
const user = require('./Routes/user')
const notes = require('./Routes/notes')
const serverless = require('serverless-http')

let server = { port: 3000 }

app.use(cors())
app.use(express.json())
app.use(cookieParser())

db.connect()
    .then(() => {
        console.log("Connected to the database")
    })
    .catch((err) => {
        console.error('Error Connecting to the database: ', err)
    })

app.use("/.netlify/functions/api/user", user)
app.use("/.netlify/functions/api/notes", notes)


// app.listen(server.port, () => {
//     console.log(`Succesfull Running on Port: ${server.port}`)
// })

module.exports.handler = serverless(app)