export const ADDON_ID = 'storybook-fixtures';
export const PARAM_KEY = 'fixtures';
export const PANEL_ID = `${ADDON_ID}/panel`;

export const Events = {
  INIT_PANEL: `${ADDON_ID}/init`,
  SELECT_FIXTURE: `${ADDON_ID}/select-fixture`,
};

export { withFixtures } from './decorator';
export { keyBy } from 'lodash';
