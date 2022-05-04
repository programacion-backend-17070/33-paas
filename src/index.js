const express = require('express')
const path = require('path')
const CPUs = require('os').cpus().length
const app = express()
const PORT = process.env.PORT || 8888

const productsRouter = require('./routes/products')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname, '../public')))
app.get('', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

app.get('/info', (req, res) => {
  res.send({
    num: CPUs
  })
})

app.get('/saludo', (req, res) => res.send('hola!'))

app.use('/api/products', productsRouter)

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))