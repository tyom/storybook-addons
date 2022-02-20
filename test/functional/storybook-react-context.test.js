import page from './page-model';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const getUrlPath = (path = '') =>
  BASE_URL + (BASE_URL.includes(':6006') ? '' : '/react') + path;

fixture('storybook-react-context').meta({ target: 'react' }).page(getUrlPath());

test('React context is set from useEffect', async (t) => {
  await t.click('#storybook-react-context');

  await page.selectSidebarItem('Simulate Loading');
  // decrease timeout. Setting on mount is emulated with 2s timeout in component
  await page.assertTextInPreview('#loading-status', 'Loading…', {
    timeout: 1500,
  });
  await page.assertTextInPreview('#auth-status', 'Unauthenticated', {
    timeout: 1500,
  });
  await t.wait(2000);
  await page.assertTextInPreview('#loading-status', 'Loaded.');
  await page.assertTextInPreview('#auth-status', 'Authenticated', {
    timeout: 1500,
  });
});

test('React context is set on button click', async (t) => {
  await t.click('#storybook-react-context');

  await page.selectSidebarItem('Change On Interaction');

  await page.assertTextInPreview('#auth-status', 'Unauthenticated');

  await page.clickInPreview('#context-button');

  await page.assertTextInPreview('#auth-status', 'Authenticated');

  await page.clickInPreview('#context-button');

  await page.assertTextInPreview('#auth-status', 'Unauthenticated');
});

test('React context is set statically in story parameters', async (t) => {
  await t.click('#storybook-react-context');

  await page.selectSidebarItem('Static Initial Context');

  await page.assertTextInPreview('#auth-status', 'Authenticated');
});

test('React context is updated with Storybook Controls', async (t) => {
  await t.click('#storybook-react-context');

  await page.selectSidebarItem('Update Context From Args');

  await page.assertTextInPreview('#auth-status', 'Unauthenticated');

  await page.selectPanel('Controls');
  await t.click(page.controlsPanel.find('label[for=authenticated]'));

  await page.assertTextInPreview('#auth-status', 'Authenticated');

  await t.click(page.controlsPanel.find('label[for=authenticated]'));
  await page.assertTextInPreview('#auth-status', 'Unauthenticated');
});
