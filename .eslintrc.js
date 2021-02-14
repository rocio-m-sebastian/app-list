module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "prefer-destructuring": ["error", {
      "array": "off",
      "object": "off"
    }],
    "no-param-reassign": "off",
    "arrow-body-style": "off",
    "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "never"
    }],
  }
};