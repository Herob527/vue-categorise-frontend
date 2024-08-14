/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: '**/*.cjs',
      env: {
        node: true,
        browser: false,
      },
    },
  ],
};
