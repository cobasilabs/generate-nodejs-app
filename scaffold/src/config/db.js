module.exports = `\
import mongoose from 'mongoose'

import env from '~/config/env'

mongoose.connect(env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
)

export default mongoose

`