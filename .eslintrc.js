module.exports = {
  extends: ['@storybook/eslint-config-storybook'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['test/**/*.js', '**/*.test.js'] },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.stories.js'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: ['test/**/*.js'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/no-test-callback': 'off',
      },
    },
  ],
};
