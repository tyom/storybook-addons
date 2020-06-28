import { withFixtures, keyBy } from 'storybook-fixtures';
import 'tailwindcss/dist/utilities.css';
import pantheraData from '../__fixtures__/panthera.json';

const pantheraCollection = Object.values(pantheraData);

function renderTemplate({ title, extract_html, thumbnail }) {
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
        <div class="px-6 py-4">
          <h2 data-id="title" class="font-bold text-2xl mb-2 mt-0">
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

export const collectionFixtureNoTab = ({ fixture }) => renderTemplate(fixture);
collectionFixtureNoTab.story = {
  name: 'fixture setting: singleTab',
  decorators: [
    withFixtures({
      collection: pantheraCollection,
    }),
  ],
};

export const collectionFixture = ({ fixture }) => renderTemplate(fixture);
collectionFixture.story = {
  decorators: [
    withFixtures({
      __singleTab: true,
      collection: pantheraCollection,
    }),
  ],
};

export const objectFixture = ({ fixture }) => renderTemplate(fixture);
objectFixture.story = {
  decorators: [
    withFixtures({
      'Panthera Genus': pantheraData,
      'Keyed collection': keyBy(pantheraCollection, 'description'),
    }),
  ],
};

export const remoteFixture = ({ fixture }) => renderTemplate(fixture);
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

export const stringValueFixture = ({ fixture }) =>
  `<h1 class="font-sans">${fixture}</h1>`;

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

export const noFixture = () => {
  return renderTemplate({
    title: 'No fixture',
    extract_html:
      '<p>For testing fixture state when switching to stories which don’t use it.</p>',
  });
};

export const disabledFixture = () => {
  return renderTemplate({
    title: 'Disable fixture',
    extract_html:
      '<p>For testing fixture state when switching to stories which disable it.</p>',
  });
};
disabledFixture.story = {
  parameters: {
    fixtures: { disabled: true },
  },
};
