const functions = require('firebase-functions')
const express = require('express')

// 中国語
const nodejieba = require('nodejieba')

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello world!')
})

app.get('/chinese', (req, res) => {
  const text = req.query.text
  res.send(nodejieba.tag(text))
})

const api = functions.https.onRequest(app)
module.exports = { api }
