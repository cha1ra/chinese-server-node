const functions = require('firebase-functions')
const express = require('express')

// 中国語
const OpenCC = require('opencc')
const nodejieba = require('nodejieba')

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello world!')
})

app.get('/chinese', async (req, res) => {
  // クエリ関係
  const text = req.query.text
  const isSimplified = req.query.isSimplified

  // 翻訳関係
  let simplified, traditional
  console.log(isSimplified)
  if (isSimplified === 1) {
    const chineseConverter = new OpenCC('s2t.json')
    simplified = text
    traditional = await chineseConverter.convertPromise(text)
  } else {
    const chineseConverter = new OpenCC('t2s.json')
    simplified = await chineseConverter.convertPromise(text)
    traditional = text
  }
  const japaneseConverter = new OpenCC('t2jp.json')
  const shinji = await japaneseConverter.convertPromise(traditional)

  // レスポンス用オブジェクト作成
  const responseJson = {
    simplified,
    traditional,
    shinji,
    words: nodejieba.tag(text)
  }

  res.send(responseJson)
})

const api = functions.https.onRequest(app)
module.exports = { api }
