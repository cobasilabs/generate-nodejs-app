module.exports = {
  name: '',
  version: '1.0.0',
  main: 'app/app.js',
  license: 'MIT',
  scripts: {
    lint: 'standard ./**/*.js',
    test: 'jest --setupFiles dotenv/config --runInBand',
    serve: 'yarn lint; node app/server.js',
    debug: 'nodemon --inspect app/server.js --exec \'yarn lint; node\''
  },
  jest: {
    testEnvironment: 'node'
  },
}
