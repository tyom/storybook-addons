import React from 'react';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { useParameter } from '@storybook/api';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '.';

addons.register(ADDON_ID, () => {
  addons.addPanel(PANEL_ID, {
    title() {
      const fixtures: {} = useParameter(PARAM_KEY) ?? {};
      const fixtureCount = Object.keys(fixtures).length;
      return `Fixtures ${fixtureCount ? `(${fixtureCount})` : ''}`;
    },
    type: types.PANEL,
    paramKey: PARAM_KEY,
    render: ({ active = false, key }) => {
      return (
        <AddonPanel key={key} active={active}>
          <Panel />
        </AddonPanel>
      );
    },
  });
});
