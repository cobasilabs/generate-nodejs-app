module.exports = {
  name: '',
  version: '1.0.0',
  license: 'MIT',
  scripts: {
    start: 'yarn lint; node -r dotenv/config -r esm -r module-alias/register server.js',
    dev: 'nodemon --inspect server.js --exec \'yarn lint; node -r dotenv/config -r esm -r module-alias/register\'',
    lint: 'standard ./**/*.js',
    test: 'jest --setupFiles dotenv/config --runInBand --coverage',
    'test:watch': 'jest --setupFiles dotenv/config --runInBand --coverage --watch'
  },
  jest: {
    testEnvironment: 'node',
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 0
      }
    }
  },
  _moduleAliases: {
    '~': './src'
  },
  standard: {
    ignore: [
      '__mocks__'
    ]
  }
}
