const express = require('express')
const app = express()
const PORT = process.env.PORT || 8888

app.get('', (req, res) => res.send('ok'))

app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))