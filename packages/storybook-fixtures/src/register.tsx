import React from 'react';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '.';

addons.register(ADDON_ID, () => {
  addons.addPanel(PANEL_ID, {
    title: 'Fixtures',
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
