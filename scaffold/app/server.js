module.exports = `\
require('dotenv').config()
const api = require('./api')
const mongoose = require('mongoose')
const { API_PORT, MONGO_URL } = process.env

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.on('connected', () => {
  api.listen(API_PORT, () => console.log(\`App serving on port \${API_PORT}\`))
})
`