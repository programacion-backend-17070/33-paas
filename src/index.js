const express = require('express')
const path = require('path')

const mainRouter = require('./routes/app')
const app = express()
const PORT = process.env.PORT || 8888

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname, '../public')))
app.use('/api/products', mainRouter)

app.get('', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))