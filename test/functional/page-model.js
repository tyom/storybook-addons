import { Selector } from 'testcafe';
import { t } from 'testcafe';

class Page {
  assertTextInPreview(selector, expectedText) {
    return t
      .switchToIframe('#storybook-preview-iframe')
      .expect(Selector(selector).innerText)
      .eql(expectedText)
      .switchToMainWindow();
  }

  selectSidebarItem(title) {
    const sidebarLink = Selector('.sidebar-container .simplebar-content').find(
      `a[title="${title}"]`
    );
    return t.click(sidebarLink);
  }

  selectPanel(panelName) {
    const panelTab = Selector('#storybook-panel-root > div:nth-child(1) [role="tablist"]')
      .find('button')
      .withText(panelName);
    return t.click(panelTab);
  }

  selectFixture(fixtureName) {
    const fixtureTab = Selector(
      '#storybook-panel-root > div:nth-child(2) [role="tablist"]'
    )
      .find('button')
      .withText(fixtureName);
    return t.click(fixtureTab);
  }

  selectVariant(variantName) {
    const variantButton = Selector(`#storybook-panel-root [data-id="${variantName}"]`);

    return t.click(variantButton);
  }

  openCanvasInNewTab() {
    return t.click('button[title="Open canvas in new tab"]');
  }
}

export default new Page();
