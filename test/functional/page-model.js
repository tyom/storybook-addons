import { Selector, t } from 'testcafe';

class Page {
  constructor() {
    this.panelTabs = Selector(
      '#storybook-panel-root > div:nth-child(1) [role="tablist"]'
    );
    this.controlsPanel = Selector('#storybook-panel-root .docblock-argstable-body');
    this.fixtureTabs = Selector('#storybook-panel-root .fixture-section-tabs');
    this.tabActions = Selector(
      '#storybook-panel-root #panel-tab-content > div > div > menu + div'
    );
  }

  assertTextInPreview(selector, expectedText, assertionOptions) {
    return t
      .switchToIframe('#storybook-preview-iframe')
      .expect(Selector(selector).innerText)
      .eql(expectedText, assertionOptions)
      .switchToMainWindow();
  }

  assertClassInPreview(selector, className) {
    return t
      .switchToIframe('#storybook-preview-iframe')
      .expect(Selector(selector).hasClass(className))
      .eql(true)
      .switchToMainWindow();
  }

  clickInPreview(selector) {
    return t
      .switchToIframe('#storybook-preview-iframe')
      .click(selector)
      .switchToMainWindow();
  }

  selectSidebarItem(title) {
    const sidebarLink = Selector('.sidebar-container .os-content')
      .find('a')
      .withText(title);
    return t.click(sidebarLink);
  }

  selectPanel(panelName) {
    const panelTab = this.panelTabs.find('button').withText(panelName);
    return t.click(panelTab);
  }

  selectControl(controlName) {
    const fixtureTab = this.controlsPanel.find('label').withText(controlName);
    return t.click(fixtureTab);
  }

  selectFixture(fixtureName) {
    const fixtureTab = this.fixtureTabs.find('button').withText(fixtureName);
    return t.click(fixtureTab);
  }

  selectVariant(variantName) {
    const variantButton = Selector(`#storybook-panel-root [data-id="${variantName}"]`);

    return t.click(variantButton);
  }

  selectActionBarItem(itemName) {
    return t.click(this.tabActions.find('button').withText(itemName));
  }

  openCanvasInNewTab() {
    return t.click('a[title="Open canvas in new tab"]');
  }

  async hasSections() {
    return t.expect(Selector('#tabbed-fixture-sections').exists).eql(true);
  }
}

export default new Page();
