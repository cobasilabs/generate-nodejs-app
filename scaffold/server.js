module.exports = `\
import db from '~/config/db'

import env from '~/config/env'
import app from '~/index'

db.connection.on('connected', () => {
  app.listen(env.API_PORT, () =>
    console.log(\`App serving on port \${env.API_PORT}\`)
  )
})

`