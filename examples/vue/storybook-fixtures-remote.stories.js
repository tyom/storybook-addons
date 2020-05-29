import { storiesOf } from '@storybook/vue';
import { createFixtureInput, getRemoteFixture } from 'storybook-fixtures';
import UserCard from './UserCard.vue';

// Separate file for storiesOf required to use async props in Vue component.
// This is due to currently unsupported mix of storiesOf and CSF in Storybook:
//   "Illegal mix of CSF default export and storiesOf calls in a single file"
// More info: https://github.com/storybookjs/storybook/issues/9196#issuecomment-568262252

// Storybook requires knobs to be only initialised in props and due to the
// async nature of the props there needs to be an async function level above.
// Using storiesOf approach with async IIFE seems to be the only way to do it.

// Storybook knobs must be defined in Vue props.
// https://github.com/storybookjs/storybook/issues/4947
// Add a story asynchronously in order to resolve the request and pass
// it as a static prop.
(async () => {
  const collection = await getRemoteFixture('./mock-collection.json');
  const knobInput = createFixtureInput(collection, 'first_name');

  storiesOf('storybook-fixtures', module).add('Remote Fixture', () => {
    return {
      ...UserCard,
      props: {
        fixture: {
          default: knobInput('Select variant', {
            type: 'radio',
          }),
        },
      },
    };
  });
})();
