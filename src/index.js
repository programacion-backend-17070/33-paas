const express = require('express')
const CPUs = require('os').cpus().length
const app = express()
const PORT = process.env.PORT || 8082

app.get('', (req, res) => res.send('ok Server1'))

app.get("/info", (req, res) => {
    res.send({
        num: CPUs
    })
})

app.get("/suma", (req, res) => {
    const {num1, num2} = req.query

    res.send({
        result: Number(num1) + Number(num2)
    })



app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))