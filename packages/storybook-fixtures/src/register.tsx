import React from 'react';
import addons, { RenderOptions } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from '.';

addons.register(ADDON_ID, () => {
  addons.addPanel(PANEL_ID, {
    title: 'Fixtures',
    render: ({ active = true, key }: RenderOptions) => {
      console.log('register');
      return (
        <AddonPanel key={key} active={active || false}>
          <Panel />
        </AddonPanel>
      );
    },
    paramKey: PARAM_KEY,
  });
});
