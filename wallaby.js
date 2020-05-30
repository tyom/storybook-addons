module.exports = () => ({
  autoDetect: true,
  files: [{ pattern: 'packages/**/src/**/*.ts?(x)' }],
  tests: ['packages/**/*.test.js', 'packages/**/*.test.ts'],
});
