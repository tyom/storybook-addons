import { keyBy } from 'storybook-fixtures';
import 'tailwindcss/dist/utilities.css';
import pantheraData from '../__fixtures__/panthera.json';

const pantheraCollection = Object.values(pantheraData);

function renderTemplate(
  { title, extract_html, thumbnail } = {},
  textColor = '',
  bgColor = ''
) {
  if (!title || !extract_html) {
    return '';
  }
  return `
      <div class="font-sans text-gray-800 max-w-sm rounded overflow-hidden shadow-lg bg-white">
        ${
          thumbnail
            ? `<div class="bg-cover h-64" style="background-image: url('{{ image }}')"></div>`
            : ''
        }
        <div data-id="body" class="px-6 py-4 bg-${bgColor}">
          <h2 data-id="title" class="font-bold text-2xl mb-2 mt-0 text-${textColor}">
            {{ title }}
          </h2>
          <div class="text-gray-700 text-base">{{ description }}</div>
        </div>
      </div>
    `
    .replace('{{ title }}', title)
    .replace('{{ description }}', extract_html)
    .replace('{{ image }}', thumbnail ? thumbnail.source : '');
}
export default {
  title: 'storybook-fixtures',
};

export const FixtureWithArgs = (args, { fixtures: [genus, textColor = ''] }) =>
  renderTemplate(genus, textColor, args.bgColor);

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

export const FixtureSections = (_, { fixtures: [genus, textColor = ''] }) =>
  renderTemplate(genus, textColor);

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

export const CollectionFixtureNoTab = (_, { fixture }) => renderTemplate(fixture);
CollectionFixtureNoTab.storyName = 'fixture setting: singleTab';
CollectionFixtureNoTab.parameters = {
  fixtures: {
    collection: pantheraCollection,
  },
};

export const CollectionFixture = (_, { fixture }) => renderTemplate(fixture);
CollectionFixture.parameters = {
  fixtures: {
    __singleTab: true,
    collection: pantheraCollection,
  },
};

export const ObjectFixture = (_, { fixture }) => renderTemplate(fixture);
ObjectFixture.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    'Keyed collection': keyBy(pantheraCollection, 'description'),
  },
};

export const RemoteFixture = (_, { fixture }) => renderTemplate(fixture);
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

export const StringValueFixture = (_, { fixture }) =>
  `<h1 class="font-sans">${fixture}</h1>`;

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

export const NoFixture = () => {
  return renderTemplate({
    title: 'No fixture',
    extract_html:
      '<p>For testing fixture state when switching to stories which don’t use it.</p>',
  });
};

export const DisabledFixture = () => {
  return renderTemplate({
    title: 'Disable fixture',
    extract_html:
      '<p>For testing fixture state when switching to stories which disable it.</p>',
  });
};
DisabledFixture.parameters = {
  fixtures: { disabled: true },
};
