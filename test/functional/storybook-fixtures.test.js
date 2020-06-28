import { Selector } from 'testcafe';
import page from './page-model';

const BASE_URL = 'http://localhost:5000';
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
];
const titleSelector = '[data-id="title"]';

for (const { urlPath, fixtureName } of useCases) {
  fixture
    .meta(
      'target',
      fixtureName.toLowerCase()
    )(fixtureName)
    .page(BASE_URL + urlPath);

  test('Fixture setting: singleTab', async t => {
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

    await page.selectFixture('Keyed Collection');
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

    await page.selectFixture('Keyed Collection');
    await page.assertTextInPreview(titleSelector, 'Tiger');
    await page.selectVariant('species of mammal');
    await page.assertTextInPreview(titleSelector, 'Snow leopard');

    await page.selectFixture('Panthera Genus');
    await page.assertTextInPreview(titleSelector, 'Lion');
  });

  test('Keyboard shortcuts: section tabs', async t => {
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

  test('Keyboard shortcuts: variants', async t => {
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

  test('Open selection in new tab on its own', async (t) => {
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

  test('No fixture defined', async (t) => {
    await page.selectSidebarItem('No Fixture');

    await t.expect(page.panelTabs.find('button').withText('Fixtures').exists).ok();
    await t.expect(page.fixtureTabs.find('button').exists).notOk();
  });

  test('Disabled fixtures panel', async (t) => {
    await page.selectSidebarItem('Disabled Fixture');

    await t.expect(page.panelTabs.find('button').withText('Fixtures').exists).notOk();
    await t.expect(page.fixtureTabs.find('button').exists).notOk();
  });
}
