module.exports = {
  root: true,
  extends: [
    '@storybook/eslint-config-storybook',
    'plugin:testcafe/recommended',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.stories.js'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
