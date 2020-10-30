import React from 'react';
import { keyBy } from 'storybook-fixtures';
import 'tailwindcss/dist/utilities.css';
import pantheraData from '../__fixtures__/panthera.json';
import Card from './Card';

const pantheraCollection = Object.values(pantheraData);

export default {
  title: 'storybook-fixtures',
};

export const fixtureSections = (_, { fixtures: [genus, textColor] }) => {
  return <Card {...genus} textColor={textColor} />;
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

export const collectionFixtureNoTab = (_, { fixture }) => <Card {...fixture} />;
collectionFixtureNoTab.storyName = 'fixture setting: singleTab';
collectionFixtureNoTab.parameters = {
  fixtures: {
    collection: pantheraCollection,
  },
};

export const collectionFixture = (_, { fixture }) => <Card {...fixture} />;
collectionFixture.parameters = {
  fixtures: {
    __singleTab: true,
    collection: pantheraCollection,
  },
};

export const objectFixture = (_, { fixture }) => {
  return <Card {...fixture} />;
};
objectFixture.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    'Keyed collection': keyBy(pantheraCollection, 'description'),
  },
};

export const remoteFixture = (_, { fixture }) => <Card {...fixture} />;
remoteFixture.parameters = {
  fixtures: {
    Neofelis: {
      'Clouded Leopard': 'fetch::./local-data.json',
      'Sunda Clouded Leopard':
        'fetch::https://en.wikipedia.org/api/rest_v1/page/summary/Sunda_clouded_leopard',
    },
  },
};

export const stringValueFixture = (_, { fixture }) => {
  return <h1 className="font-sans text-white">{fixture}</h1>;
};
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
disabledFixture.parameters = {
  fixtures: { disable: true },
};
