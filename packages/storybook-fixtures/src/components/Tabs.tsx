/* global window */
import React from 'react';
import { styled } from '@storybook/theming';
import { ActionBar } from '@storybook/components';

const Container = styled.div({
  width: '100%',
  position: 'relative',
  minHeight: '100%',
});

const Item = styled.button<{ active?: boolean }>(
  ({ theme }) => ({
    textDecoration: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: 1,
    height: 40,
    color: theme.barTextColor,
    border: 'none',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    background: 'transparent',

    '&:focus': {
      outline: '0 none',
      borderBottom: `3px solid ${theme.color.secondary}`,
    },
  }),
  ({ active, theme }) =>
    active
      ? {
          opacity: 1,
          borderBottom: `3px solid ${theme.color.secondary}`,
        }
      : {}
);

const TabsWrapper = styled.div({});

const List = styled.div<{}>(({ theme }) => ({
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`,
  background: 'rgba(0, 0, 0, .05)',
  display: 'flex',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap',
}));

interface TabsProps {
  activeIdx: number;
  singleTab: boolean | undefined;
  tabs: {
    label: JSX.Element;
    panel: JSX.Element;
  }[];
  onTabClick: (idx) => void;
  onResetSelections: () => void;
}

export const Tabs: React.FC<TabsProps> = ({
  activeIdx,
  singleTab = false,
  tabs,
  onTabClick = () => {},
  onResetSelections = () => {},
}) => {
  const showTabs = (tabs.length === 1 && singleTab) || tabs.length > 1;
  const actionItems = [
    {
      title: 'Reset selections',
      onClick: onResetSelections,
    },
  ];
  return (
    <Container>
      {showTabs && (
        <List>
          <TabsWrapper className="fixture-section-tabs">
            {tabs.map((tab, idx) => (
              <Item
                /* eslint-disable-next-line react/no-array-index-key */
                key={idx}
                active={activeIdx === idx}
                onClick={() => onTabClick(idx)}
              >
                {tab.label}
              </Item>
            ))}
          </TabsWrapper>
        </List>
      )}
      {tabs[activeIdx]?.panel}
      <ActionBar actionItems={actionItems} />
    </Container>
  );
};
