export const ADDON_ID = 'storybook-fixtures';
export const PARAM_KEY = 'fixtures';
export const PANEL_ID = `${ADDON_ID}/panel`;

export const Events = {
  INIT: `${ADDON_ID}/init`,
  CHANGE: `${ADDON_ID}/change`,
};

export { withFixtures } from './decorator';
export { keyBy } from 'lodash';

// istanbul ignore next
if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
