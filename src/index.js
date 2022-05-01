const express = require('express')
const app = express()
const PORT = process.env.PORT || 8888



app.listen(PORT, () => console.log(`server at http://localhost:${PORT}`))