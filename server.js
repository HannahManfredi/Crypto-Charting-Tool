// const express = require('express')
// const cors = require('cors')
// const parser = require('body-parser')
// const path = require('path')

// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// module.exports = app;

const express = require('express')
const app = express()
const port = 3000

app.use(cors)
app.use(parser.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})