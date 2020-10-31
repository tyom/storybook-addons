/* global window */
import { Selector } from 'testcafe';
import page from './page-model';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const isReact = BASE_URL.includes(':6006');
const isVue = BASE_URL.includes(':6009');
const isHtml = BASE_URL.includes(':6008');
const isDevServer = isReact || isVue || isHtml;

const useCases = [
  {
    urlPath: '/react',
    fixtureName: 'React',
  },
  {
    urlPath: '/vue',
    fixtureName: 'Vue',
  },
  {
    urlPath: '/html',
    fixtureName: 'HTML',
  },
].filter((x) =>
  // filter out individual run scripts or use all use cases
  isDevServer
    ? (x.urlPath.includes('react') && isReact) ||
      (x.urlPath.includes('vue') && isVue) ||
      (x.urlPath.includes('html') && isHtml)
    : true
);
const titleSelector = '[data-id="title"]';

const environmentUseCases = useCases.map((c) =>
  isDevServer
    ? {
        ...c,
        urlPath: '/',
      }
    : c
);

environmentUseCases.forEach(({ urlPath, fixtureName }) => {
  fixture
    .meta(
      'target',
      fixtureName.toLowerCase()
    )(`storybook-fixtures ${fixtureName}`)
    .page(BASE_URL + urlPath);

  test('Fixture Sections', async (t) => {
    await page.selectSidebarItem('Fixture Sections');
    await page.selectPanel('Fixtures');

    await page.selectFixture('Panthera Genus');
    await page.selectVariant('Leopard');

    await page.selectFixture('colors');
    await page.selectVariant('Green');

    await page.selectFixture('Panthera Genus');
    await page.assertClassInPreview(titleSelector, 'text-green-700');
  });

  test('Fixture setting: singleTab', async (t) => {
    await page.selectSidebarItem('fixture setting: singleTab');
    await page.selectPanel('Fixtures');
    await t.expect(page.fixtureTabs.exists).eql(false);

    await page.selectSidebarItem('Collection Fixture');
    await t.expect(page.fixtureTabs.exists).eql(true);
  });

  test('Collection fixture', async () => {
    await page.selectSidebarItem('Collection Fixture');
    await page.selectPanel('Fixtures');
    // Ensure first variant is selected by default
    await page.assertTextInPreview(titleSelector, 'Tiger');

    await page.selectVariant('Variant 3');
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    await page.selectVariant('Variant 5');
    await page.assertTextInPreview(titleSelector, 'Snow leopard');
  });

  test('Object fixture', async () => {
    await page.selectSidebarItem('Object Fixture');
    await page.selectPanel('Fixtures');
    // Ensure first variant is selected by default
    await page.assertTextInPreview(titleSelector, 'Tiger');

    await page.selectFixture('Panthera Genus');
    // Ensure first variant is selected by default
    await page.assertTextInPreview(titleSelector, 'Tiger');
    await page.selectVariant('Jaguar');
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    await page.selectVariant('Leopard');
    await page.assertTextInPreview(titleSelector, 'Leopard');

    await page.selectFixture('Keyed collection');
    // Ensure first variant is selected by default
    await page.assertTextInPreview(titleSelector, 'Tiger');

    await page.selectVariant('A large cat native to Africa and Asia');
    await page.assertTextInPreview(titleSelector, 'Lion');
    await page.selectVariant('species of mammal');
    await page.assertTextInPreview(titleSelector, 'Snow leopard');
  });

  test('Remote fixture', async () => {
    await page.selectSidebarItem('Remote Fixture');
    await page.selectPanel('Fixtures');
    // Ensure first variant is selected by default
    await page.assertTextInPreview(titleSelector, 'Clouded leopard');
    await page.selectVariant('Sunda Clouded Leopard');
    await page.assertTextInPreview(titleSelector, 'Sunda clouded leopard');
  });

  test('String value fixtures', async () => {
    await page.selectSidebarItem('String Value Fixture');
    await page.selectPanel('Fixtures');
    // Ensure first variant is selected by default
    await page.assertTextInPreview('h1.font-sans', 'Largest species of the cat family');
    await page.selectVariant('Jaguar');
    await page.assertTextInPreview('h1.font-sans', 'A large cat native to Americas');
  });

  test('Remember selections between fixtures', async () => {
    await page.selectSidebarItem('Object Fixture');
    await page.selectPanel('Fixtures');

    await page.selectFixture('Panthera Genus');
    await page.assertTextInPreview(titleSelector, 'Tiger');
    await page.selectVariant('Lion');
    await page.assertTextInPreview(titleSelector, 'Lion');

    await page.selectFixture('Keyed collection');
    await page.assertTextInPreview(titleSelector, 'Tiger');
    await page.selectVariant('species of mammal');
    await page.assertTextInPreview(titleSelector, 'Snow leopard');

    await page.selectFixture('Panthera Genus');
    await page.assertTextInPreview(titleSelector, 'Lion');
  });

  test('Keyboard shortcuts: section tabs', async (t) => {
    await page.selectSidebarItem('Object Fixture');
    await page.selectPanel('Fixtures');

    await page.assertTextInPreview(titleSelector, 'Tiger');

    await t.pressKey('3'); // select variant
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    await t.pressKey('l'); // go to next section tab
    await page.assertTextInPreview(titleSelector, 'Tiger');
    await t.pressKey('4'); // select variant
    await page.assertTextInPreview(titleSelector, 'Leopard');
    await t.pressKey('h'); // go to previous section tab
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    await t.pressKey('l'); // go to next section tab check the selected state
    await page.assertTextInPreview(titleSelector, 'Leopard');
  });

  test('Keyboard shortcuts: variants', async (t) => {
    await page.selectSidebarItem('Object Fixture');
    await page.selectPanel('Fixtures');

    await page.assertTextInPreview(titleSelector, 'Tiger');

    await t.pressKey('2');
    await page.assertTextInPreview(titleSelector, 'Lion');
    await t.pressKey('3');
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    // down
    await t.pressKey('k');
    await page.assertTextInPreview(titleSelector, 'Leopard');
    // down
    await t.pressKey('k');
    await page.assertTextInPreview(titleSelector, 'Snow leopard');
    // up
    await t.pressKey('j');
    await page.assertTextInPreview(titleSelector, 'Leopard');
  });

  test('Open selection in new tab on its own [static]', async (t) => {
    await page.selectSidebarItem('Object Fixture');
    await page.selectPanel('Fixtures');
    await page.selectVariant('Jaguar');
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    await page.openCanvasInNewTab();

    const sidebarExists = Selector('nav.sidebar-container').exists;
    const panelDrawerExists = Selector('#storybook-panel-root').exists;

    await t.expect(sidebarExists).notOk();
    await t.expect(panelDrawerExists).notOk();
    await t.expect(Selector(titleSelector).innerText).eql('Jaguar');
  });

  test('Open selection in new tab on its own [remote]', async (t) => {
    await page.selectSidebarItem('Remote Fixture');
    await page.selectPanel('Fixtures');
    await page.selectVariant('Sunda Clouded Leopard');
    await page.assertTextInPreview(titleSelector, 'Sunda clouded leopard');
    await page.openCanvasInNewTab();

    const sidebarExists = Selector('nav.sidebar-container').exists;
    const panelDrawerExists = Selector('#storybook-panel-root').exists;

    await t.expect(sidebarExists).notOk();
    await t.expect(panelDrawerExists).notOk();
    await t.expect(Selector(titleSelector).innerText).eql('Sunda clouded leopard');
  });

  test('Selections are persisted between sessions', async (t) => {
    // Select the first fixture of the first story
    await page.selectSidebarItem('Fixture Sections');
    await page.selectPanel('Fixtures');
    await page.selectVariant('Jaguar');
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    // Select the second fixture of the first story
    await page.selectFixture('colors');
    await page.selectVariant('Green');
    await page.assertClassInPreview(titleSelector, 'text-green-700');

    // Select the third fixture of the second story
    await page.selectSidebarItem('Remote Fixture');
    await page.selectPanel('Fixtures');
    await page.selectVariant('Sunda Clouded Leopard');
    await page.assertTextInPreview(titleSelector, 'Sunda clouded leopard');

    await t.eval(() => window.location.reload());

    // Check the selections remain the same
    // First story
    await page.selectSidebarItem('Fixture Sections');
    await page.assertTextInPreview(titleSelector, 'Jaguar');
    await page.assertClassInPreview(titleSelector, 'text-green-700');
    // Second story
    await page.selectSidebarItem('Remote Fixture');
    await page.assertTextInPreview(titleSelector, 'Sunda clouded leopard');
  });

  test('Persisted selections can reset', async (t) => {
    // First story
    await page.selectSidebarItem('Fixture Sections');
    await page.selectPanel('Fixtures');
    await page.selectVariant('Jaguar');
    await page.selectFixture('colors');
    await page.selectVariant('Green');

    // Second story
    await page.selectSidebarItem('Remote Fixture');
    await page.selectVariant('Sunda Clouded Leopard');

    // Reset state
    await page.selectActionBarItem('Reset selections');

    // Check that all reset to initial
    await page.assertTextInPreview(titleSelector, 'Clouded leopard');

    await page.selectSidebarItem('Fixture Sections');
    await page.selectFixture('Panthera Genus');
    await page.assertTextInPreview(titleSelector, 'Tiger');
    await page.assertClassInPreview(titleSelector, 'text-red-600');
  });

  test('No fixture defined', async (t) => {
    await page.selectSidebarItem('No Fixture');

    await t.expect(page.panelTabs.find('button').withText('Fixtures').exists).ok();
    await t.expect(page.fixtureTabs.find('button').exists).notOk();
    await t.expect(Selector('#panel-tab-content h3').withText('No fixtures').exists).ok();
  });

  test('Disabled fixtures panel', async (t) => {
    await page.selectSidebarItem('Disabled Fixture');

    await t.expect(page.panelTabs.find('button').withText('Fixtures').exists).notOk();
    await t.expect(page.fixtureTabs.find('button').exists).notOk();
  });
});
