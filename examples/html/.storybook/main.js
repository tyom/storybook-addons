module.exports = {
  core: { builder: 'webpack5' },
  features: { postcss: false },
  stories: ['../**/*.stories.js'],
  staticDirs: ['../../__fixtures__'],
  addons: [
    'storybook-fixtures',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
  ],
};
