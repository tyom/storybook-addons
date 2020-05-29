import { createFixtureInput } from 'storybook-fixtures';
import mockCollection from '../__fixtures__/mock-collection.json';
import mockObject from '../__fixtures__/mock-object.json';
import UserCard from './UserCard.vue';

export default {
  title: 'storybook-fixtures',
};

const collectionFixtureInput = createFixtureInput(mockCollection);
const objectFixtureInput = createFixtureInput(mockObject);
const objectFixtureInput2 = createFixtureInput(
  mockObject,
  (variant, key) => `${key} - ${variant.last_name}`
);

export const collectionFixture = () => ({
  ...UserCard,
  props: {
    fixture: {
      default: collectionFixtureInput('Select variant', {
        type: 'radio',
        initial: 'Variant 5',
      }),
    },
  },
});

export const objectFixtureRadio = () => ({
  ...UserCard,
  props: {
    fixture: {
      default: objectFixtureInput('Select variant', {
        type: 'inline-radio',
      }),
    },
  },
});

export const objectFixtureSelect = () => ({
  ...UserCard,
  props: {
    fixture: {
      default: objectFixtureInput2('Select variant'),
    },
  },
});
