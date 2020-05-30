import React from 'react';
import addons from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import Panel from './Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '.';

addons.register(ADDON_ID, (api) => {
  addons.addPanel(PANEL_ID, {
    title: 'Fixtures',
    render: ({ active, key }) => {
      return (
        <AddonPanel key={key} active={active}>
          <Panel />
        </AddonPanel>
      );
    },
    paramKey: PARAM_KEY,
  });
});
