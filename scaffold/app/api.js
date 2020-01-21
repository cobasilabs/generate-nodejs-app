module.exports = `\
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const todoRoutes = require('./routes/todo')
const api = express()

api.use(cors())
api.use(bodyParser.json())
api.use('/', todoRoutes)

module.exports = api
`