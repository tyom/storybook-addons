import React from 'react';
import { withFixtures, keyBy } from 'storybook-fixtures';
import 'tailwindcss/dist/utilities.css';
import pantheraData from '../__fixtures__/panthera.json';

const pantheraCollection = Object.values(pantheraData);

export default {
  title: 'storybook-fixtures',
};

// Styling with Tailwind CSS https://tailwindcss.com
const Card = ({ title, thumbnail, extract_html }) => {
  return (
    <div className="font-sans text-gray-800 max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {thumbnail && (
        <div
          className="bg-cover h-64"
          style={{ backgroundImage: `url('${thumbnail.source}')` }}
        />
      )}
      <div className="px-6 py-4">
        <h2 data-id="title" className="font-bold text-2xl mb-2 mt-0">
          {title}
        </h2>
        {/* eslint-disable-next-line react/no-danger */}
        <div
          className="text-gray-700 text-base"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: extract_html }}
        />
      </div>
    </div>
  );
};

export const collectionFixture = ({ fixture }) => {
  return <Card {...fixture} />;
};
collectionFixture.story = {
  decorators: [
    withFixtures({
      collection: pantheraCollection,
    }),
  ],
};

export const objectFixture = ({ fixture }) => {
  return <Card {...fixture} />;
};
objectFixture.story = {
  decorators: [
    withFixtures({
      'Panthera Genus': pantheraData,
      'Keyed collection': keyBy(pantheraCollection, 'description'),
    }),
  ],
};

export const remoteFixture = ({ fixture }) => {
  return <Card {...fixture} />;
};
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

export const noFixture = () => (
  <Card
    title="No fixture"
    extract_html="<p>For testing fixture state when switching to stories which don’t use it.</p>"
  />
);

export const disabledFixture = () => (
  <Card
    title="Disable fixture"
    extract_html="<p>For testing fixture state when switching to stories which disable it.</p>"
  />
);
disabledFixture.story = {
  parameters: {
    fixtures: { disabled: true },
  },
};
