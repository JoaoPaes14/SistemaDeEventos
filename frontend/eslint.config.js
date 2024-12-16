/** @type {import('eslint').Linter.Config} */
module.exports = [
  {
    languageOptions: {
      globals: {
        browser: true,
        node: true,
      },
    },
    extends: [require('@react-native-community/eslint-config')],
  },
];
