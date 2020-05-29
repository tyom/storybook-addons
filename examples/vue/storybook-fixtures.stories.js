import { storiesOf } from '@storybook/vue';
import { createFixtureInput, getRemoteFixture } from 'storybook-fixtures';
import mockCollection from '../__fixtures__/mock-collection.json';
import mockObject from '../__fixtures__/mock-object.json';

export default {
  title: 'storybook-fixtures',
};

const collectionFixtureInput = createFixtureInput(mockCollection);
const objectFixtureInput = createFixtureInput(mockObject);
const objectFixtureInput2 = createFixtureInput(
  mockObject,
  (variant, key) => `${key} - ${variant.last_name}`
);

const commonStory = {
  template: `
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{fullName}}</span>
      </div>
      <el-input placeholder="Please input" :value="fixture.email" />
      <p>{{fixture.description}}</p>
      <el-button>Save</el-button>
    </el-card>
  `,
  computed: {
    fullName() {
      return [this.fixture.first_name, this.fixture.last_name].join(' ');
    },
  },
};

export const collectionFixture = () => ({
  ...commonStory,
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
  ...commonStory,
  props: {
    fixture: {
      default: objectFixtureInput('Select variant', {
        type: 'inline-radio',
      }),
    },
  },
});

export const objectFixtureSelect = () => ({
  ...commonStory,
  props: {
    fixture: {
      default: objectFixtureInput2('Select variant'),
    },
  },
});

// Storybook knobs must be defined in Vue props.
// https://github.com/storybookjs/storybook/issues/4947
// Add a story asynchronously in order to resolve the request and pass
// it as a static prop.
(async () => {
  const collection = await getRemoteFixture('./mock-collection.json');
  const knobInput = createFixtureInput(collection, 'first_name');

  storiesOf('storybook-fixtures', module).add('Remote Fixture', () => {
    return {
      ...commonStory,
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
