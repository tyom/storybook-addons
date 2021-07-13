import React from 'react';
import { styled } from '@storybook/theming';

const fixtureExample = `
myStory.parameters = {
  fixtures: {
    'Section name (tab)': {
      'Variant name': {
         // fixture data
       }
    }
  }
}
`.trim();

export default function NoFixtures() {
  return (
    <StyledNoFixtures>
      <div className="content">
        <h3>No fixtures</h3>
        <p>Add story fixtures using `fixtures` story parameter.</p>
        <code>{fixtureExample}</code>
      </div>
    </StyledNoFixtures>
  );
}

const StyledNoFixtures = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;

  .content {
    border: 2px solid #aaa3;
    padding: 2rem;
    margin: 1rem auto;
  }

  h3 {
    font-weight: 600;
    font-size: 1.4em;
  }

  code {
    white-space: pre;
    padding: 1rem;
    background-color: #0001;
    display: block;
    margin: 0 -1rem -1rem -1rem;
  }
`;
