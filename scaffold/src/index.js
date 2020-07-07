module.exports = `\
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import todoRoutes from '~/routes/todo'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', todoRoutes)

export default app
`