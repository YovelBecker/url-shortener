const express = require('express')
const urlRoutes = require('./api/url.routes')

const app = express()

app.use(express.json())

const PORT = 3000

app.use('/', urlRoutes)

app.listen(PORT, () => console.log('server is running on port 3000'))