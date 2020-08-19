/* global window */
import React from 'react';
import { styled, css } from '@storybook/theming';
import { ActionBar } from '@storybook/components';

const Container = styled.div`
  width: 100%;
  position: relative;
  min-height: 100%;
`;

const Item = styled.button<{ active?: boolean }>`
  text-decoration: none;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.s2 - 1};
  color: ${({ theme }) => theme.barTextColor};
  line-height: 1;
  height: 40px;
  border: none;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  background: transparent;

  &:focus {
    outline: 0 none;
    border-bottom: 3px solid ${({ theme }) => theme.color.secondary};
  }

  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.color.secondary};
      border-bottom: 3px solid ${theme.color.secondary};
    `}
`;

const List = styled.div`
  box-shadow: ${({ theme }) => theme.appBorderColor} 0 -1px 0 0 inset;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
`;

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
          <div className="fixture-section-tabs">
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
          </div>
        </List>
      )}
      {tabs[activeIdx]?.panel}
      <ActionBar actionItems={actionItems} />
    </Container>
  );
};
