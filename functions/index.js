const functions = require('firebase-functions')
const express = require('express')

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello world!')
})

const api = functions.https.onRequest(app)
module.exports = { api }
