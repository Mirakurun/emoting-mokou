module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'node/no-unpublished-require': 'off',
    'no-console': 'off',
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'es5' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['aws-sdk'],
      },
    ],
  },
};
