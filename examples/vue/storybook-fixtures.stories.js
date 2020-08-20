import { withFixtures, keyBy } from 'storybook-fixtures';
import 'tailwindcss/dist/utilities.css';
import pantheraData from '../__fixtures__/panthera.json';

const pantheraCollection = Object.values(pantheraData);

const Card = {
  template: `
    <div class="font-sans text-gray-800 max-w-sm rounded overflow-hidden shadow-lg bg-white" v-if="fixture">
      <div
        v-if='fixture.thumbnail'
        class="bg-cover h-64"
        :style="backgroundImageStyle"
      />
      <div class="px-6 py-4">
        <h2 data-id="title" class="font-bold text-2xl mb-2 mt-0" :class="'text-' + fixture.textColor">
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

export const fixtureSections = (_, { fixtures: [genus, textColor] }) => {
  return {
    ...Card,
    props: {
      fixture: {
        default: { ...genus, textColor },
      },
    },
  };
};
fixtureSections.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    colors: {
      Red: 'red-600',
      Green: 'green-700',
      Blue: 'blue-600',
    },
  },
};

export const collectionFixtureNoTab = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
collectionFixtureNoTab.storyName = 'fixture setting: singleTab';
collectionFixtureNoTab.parameters = {
  fixtures: {
    collection: pantheraCollection,
  },
};

export const collectionFixture = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
collectionFixture.parameters = {
  fixtures: {
    __singleTab: true,
    collection: pantheraCollection,
  },
};

export const objectFixture = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
objectFixture.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    'Keyed collection': keyBy(pantheraCollection, 'description'),
  },
};

export const remoteFixture = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
remoteFixture.parameters = {
  fixtures: {
    Neofelis: {
      'Clouded Leopard':
        'https://en.wikipedia.org/api/rest_v1/page/summary/Clouded_leopard',
      'Sunda Clouded Leopard':
        'https://en.wikipedia.org/api/rest_v1/page/summary/Sunda_clouded_leopard',
    },
  },
};

export const stringValueFixture = (_, { fixture }) => ({
  template: `<h1 class="font-sans">{{ fixture }}</h1>`,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
stringValueFixture.parameters = {
  fixtures: {
    Values: {
      Tiger: 'Largest species of the cat family',
      Lion: 'A large cat native to Africa and Asia',
      Jaguar: 'A large cat native to Americas',
      Leopard: 'A large cat native to Africa and Eurasia',
    },
  },
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
disabledFixture.parameters = {
  fixtures: { disabled: true },
};
