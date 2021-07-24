const express = require('express')
const parser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000

app.use(parser.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;