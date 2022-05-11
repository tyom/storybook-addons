import { keyBy } from 'storybook-fixtures';
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
      <div data-id="body" class="px-6 py-4" :class="'bg-' + $props.bgColor">
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

export const FixtureWithArgs = (args, { fixtures: [genus, textColor] }) => {
  return {
    ...Card,
    props: {
      fixture: {
        default: { ...genus, textColor },
      },
      bgColor: args.bgColor,
    },
  };
};
FixtureWithArgs.argTypes = {
  bgColor: {
    name: 'Background colour',
    control: { type: 'inline-radio' },
    options: ['yellow-300', 'blue-200'],
  },
};
FixtureWithArgs.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    colors: {
      Red: 'red-600',
      Green: 'green-700',
      Blue: 'blue-600',
    },
  },
};

export const FixtureSections = (_, { fixtures: [genus, textColor] }) => {
  return {
    ...Card,
    props: {
      fixture: {
        default: { ...genus, textColor },
      },
    },
  };
};
FixtureSections.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    colors: {
      Red: 'red-600',
      Green: 'green-700',
      Blue: 'blue-600',
    },
  },
};

export const CollectionFixtureNoTab = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
CollectionFixtureNoTab.storyName = 'fixture setting: singleTab';
CollectionFixtureNoTab.parameters = {
  fixtures: {
    collection: pantheraCollection,
  },
};

export const CollectionFixture = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
CollectionFixture.parameters = {
  fixtures: {
    __singleTab: true,
    collection: pantheraCollection,
  },
};

export const ObjectFixture = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
ObjectFixture.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    'Keyed collection': keyBy(pantheraCollection, 'description'),
  },
};

export const RemoteFixture = (_, { fixture }) => ({
  ...Card,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
RemoteFixture.parameters = {
  fixtures: {
    Neofelis: {
      'Clouded Leopard':
        'fetch::https://en.wikipedia.org/api/rest_v1/page/summary/Clouded_leopard',
      'Sunda Clouded Leopard':
        'fetch::https://en.wikipedia.org/api/rest_v1/page/summary/Sunda_clouded_leopard',
    },
  },
};

export const StringValueFixture = (_, { fixture }) => ({
  template: `<h1 class="font-sans">{{ fixture }}</h1>`,
  props: {
    fixture: {
      default: fixture,
    },
  },
});
StringValueFixture.parameters = {
  fixtures: {
    Values: {
      Tiger: 'Largest species of the cat family',
      Lion: 'A large cat native to Africa and Asia',
      Jaguar: 'A large cat native to Americas',
      Leopard: 'A large cat native to Africa and Eurasia',
    },
  },
};

export const NoFixture = () => ({
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

export const DisabledFixture = () => ({
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
DisabledFixture.parameters = {
  fixtures: { disable: true },
};
