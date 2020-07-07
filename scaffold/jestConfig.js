module.exports = `\
module.exports = {
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/**/index.js',
    '!<rootDir>/src/services/**',
    '!<rootDir>/src/config/**',
    '!<rootDir>/src/server.js'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1'
  }
}

`
