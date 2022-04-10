module.exports = {
  extends: ['@storybook/eslint-config-storybook', 'plugin:storybook/recommended'],
  rules: {},
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.stories.js'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['test/**/*.js', '**/*.test.js'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/no-test-callback': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
