module.exports = {
  root: true,
  extends: ['@storybook/eslint-config-storybook', 'plugin:testcafe/recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.stories.js'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
