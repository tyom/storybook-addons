module.exports = {
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/test/functional/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};
