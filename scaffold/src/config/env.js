module.exports = `\
import * as dotEnv from 'dotenv'

dotEnv.config()

export default {
  API_PORT: parseInt(process.env.API_PORT) || 3000,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_DB: process.env.MONGO_DB
}

`