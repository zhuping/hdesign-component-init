module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2018
  },
  rules: {
    "no-console": "off",
    "semi": [1],
    "no-extra-boolean-cast": "off",
    "no-control-regex": "off",
    "quotes": [1, "single"]
  }
}