module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/test/e2e/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};
