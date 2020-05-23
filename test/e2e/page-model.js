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

  selectKnobOption(labelText, type = 'radio') {
    const panelForm = Selector('#storybook-panel-root .simplebar-content form');

    if (type === 'select') {
      const selectBox = panelForm.find('select');
      return t
        .click(selectBox)
        .click(selectBox.find('option').withText(labelText));
    }

    return t.click(panelForm.find('input + label').withText(labelText));
  }
}

export default new Page();
