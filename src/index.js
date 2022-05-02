const express = require('express')
const CPUs = require('os').cpus().length
const app = express()
const PORT = process.env.PORT || 8888

app.get('', (req, res) => res.send('hola'))

app.get('/info', (req, res) => {
  res.send({
    num: CPUs
  })
})

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))