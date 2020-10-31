module.exports = {
  extends: ['@storybook/eslint-config-storybook'],
  rules: {},
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.stories.js'],
      rules: {
        'react/prop-types': 'off',
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
