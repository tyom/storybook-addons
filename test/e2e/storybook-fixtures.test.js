import page from './page-model';

const BASE_URL = 'http://localhost:5000';
const useCases = [
  {
    urlPath: '/react',
    fixtureName: 'React',
    titleSelector: '.bp3-heading',
  },
  {
    urlPath: '/vue',
    fixtureName: 'Vue',
    titleSelector: '.el-card__header',
  },
];

for (const { urlPath, fixtureName, titleSelector } of useCases) {
  fixture(fixtureName).page(BASE_URL + urlPath);

  test('Collection fixture radios', async () => {
    await page.selectSidebarItem('Collection Fixture');
    await page.assertTextInPreview(titleSelector, 'Jamie Clerc');
    await page.selectKnobOption('Variant 4');
    await page.assertTextInPreview(titleSelector, 'Galvan Betjes');
    await page.selectKnobOption('Variant 10');
    await page.assertTextInPreview(titleSelector, 'Haze Isaq');
  });

  test('Object fixture inline radios', async () => {
    await page.selectSidebarItem('Object Fixture Radio');
    await page.assertTextInPreview(titleSelector, 'Raleigh Pullan');
    await page.selectKnobOption('Variant #2');
    await page.assertTextInPreview(titleSelector, 'Lannie Shortcliffe');
    await page.selectKnobOption('Variant #3');
    await page.assertTextInPreview(titleSelector, 'Aldrich Dunston');
  });

  test('Collection fixture select', async () => {
    await page.selectSidebarItem('Object Fixture Select');
    await page.assertTextInPreview(titleSelector, 'Raleigh Pullan');
    await page.selectKnobOption('Variant #2 - Shortcliffe', 'select');
    await page.assertTextInPreview(titleSelector, 'Lannie Shortcliffe');
    await page.selectKnobOption('Variant #3 - Dunston', 'select');
    await page.assertTextInPreview(titleSelector, 'Aldrich Dunston');
  });

  test('Remote collection fixture select', async () => {
    await page.selectSidebarItem('Remote Fixture');
    await page.assertTextInPreview(titleSelector, 'Darnall Parlour');
    await page.selectKnobOption('Galvan');
    await page.assertTextInPreview(titleSelector, 'Galvan Betjes');
    await page.selectKnobOption('Haze');
    await page.assertTextInPreview(titleSelector, 'Haze Isaq');
  });
}
