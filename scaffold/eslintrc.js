module.exports = `\
{
  "extends": [
    "standard",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true,
    "jest/globals": true
  },
  "plugins": [
    "prettier",
    "jest"
  ],
  "rules": {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "prettier/prettier": "error",
    "no-console": 0,
    "comma-dangle": "error",
    "no-extra-semi": "error",
    "quotes": [
      "error",
      "single"
    ]
  }
}

`
