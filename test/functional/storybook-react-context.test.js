import page from './page-model';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const getUrlPath = (path = '') =>
  BASE_URL + (BASE_URL.includes(':6006') ? '' : '/react') + path;

fixture('storybook-react-context').meta({ target: 'react' }).page(getUrlPath());

test('React context is set on mount', async (t) => {
  await page.selectSidebarItem('storybook-react-context');
  await page.selectSidebarItem('Change Context On Mount');
  // decrease timeout. Setting on mount is emulated with 2s timeout in component
  await page.assertTextInPreview('#context-loading', 'Loading…', {
    timeout: 1500,
  });
  await page.assertTextInPreview('#context-color', 'blue-400', {
    timeout: 1500,
  });
  await t.wait(2000);
  await page.assertTextInPreview('#context-color', 'red-400');
});

test('React context is set on button click', async (t) => {
  await page.selectSidebarItem('storybook-react-context');
  await page.selectSidebarItem('Change Context On Click');

  await page.assertTextInPreview('#context-color', 'blue-400');

  await page.clickInPreview('#context-button');

  await page.assertTextInPreview('#context-color', 'yellow-600');

  await page.clickInPreview('#context-button');

  await page.assertTextInPreview('#context-color', 'purple-400');
});
