module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
  plugins: [],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "off",
    "no-restricted-syntax": ["off", "ForOfStatement"],
    "no-unreachable-loop": ["off", "ForOfStatement"],
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
    ],
    "import/no-extraneous-dependencies": "off",
  },
};
