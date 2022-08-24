/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 2
      },      
      'multiline': {
        'max': 1
      }
    }],
    'import/first': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/script-setup-uses-vars': 2,
    'vue/valid-define-emits': 2,
    'quotes': ['error', 'single'],
    'no-unused-vars': 'off'
  },
  ignorePatterns: ['server'],
  env: {
    'vue/setup-compiler-macros': true,
  },
};
