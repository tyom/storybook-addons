import { withFixtures, keyBy } from 'storybook-fixtures';
import 'tailwindcss/dist/utilities.css';
import pantheraData from '../__fixtures__/panthera.json';

const pantheraCollection = Object.values(pantheraData);

const Card = {
  template: `
    <div class="font-sans text-gray-800 max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div
        v-if='fixture.thumbnail'
        class="bg-cover h-64"
        :style="backgroundImageStyle"
      />
      <div class="px-6 py-4">
        <h2 data-id="title" class="font-bold text-2xl mb-2 mt-0">
          {{ fixture.title }}
        </h2>
        <div class="text-gray-700 text-base" v-html="fixture.extract_html" />
      </div>
    </div>
  `,
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url('${this.fixture.thumbnail.source}')`,
      };
    },
  },
};

export default {
  title: 'storybook-fixtures',
};

export const collectionFixture = ({ fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
collectionFixture.story = {
  decorators: [
    withFixtures({
      collection: pantheraCollection,
    }),
  ],
};

export const objectFixture = ({ fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
objectFixture.story = {
  decorators: [
    withFixtures({
      'Panthera Genus': pantheraData,
      'Keyed collection': keyBy(pantheraCollection, 'description'),
    }),
  ],
};

export const remoteFixture = ({ fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
remoteFixture.story = {
  decorators: [
    withFixtures({
      Neofelis: {
        'Clouded Leopard':
          'https://en.wikipedia.org/api/rest_v1/page/summary/Clouded_leopard',
        'Sunda Clouded Leopard':
          'https://en.wikipedia.org/api/rest_v1/page/summary/Sunda_clouded_leopard',
      },
    }),
  ],
};

export const stringValueFixture = ({ fixture }) => ({
  template: `<h1 class="font-sans text-white">{{ fixture }}</h1>`,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
stringValueFixture.story = {
  decorators: [
    withFixtures({
      Values: {
        Tiger: 'Largest species of the cat family',
        Lion: 'A large cat native to Africa and Asia',
        Jaguar: 'A large cat native to Americas',
        Leopard: 'A large cat native to Africa and Eurasia',
      },
    }),
  ],
};

export const noFixture = () => ({
  ...Card,
  props: {
    fixture: {
      default: {
        title: 'No fixture',
        extract_html:
          '<p>For testing fixture state when switching to stories which don’t use it.</p>',
      },
    },
  },
});

export const disabledFixture = () => ({
  ...Card,
  props: {
    fixture: {
      default: {
        title: 'Disable fixture',
        extract_html:
          '<p>For testing fixture state when switching to stories which disable it.</p>',
      },
    },
  },
});
disabledFixture.story = {
  parameters: {
    fixtures: { disabled: true },
  },
};
