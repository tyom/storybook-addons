import React from 'react';
import { keyBy } from 'storybook-fixtures';
import pantheraData from '../__fixtures__/panthera.json';
import Card from './Card';

const pantheraCollection = Object.values(pantheraData);

export default {
  title: 'storybook-fixtures',
};

export const FixtureWithArgs = ({ bgColor }, { fixtures: [genus, textColor] }) => {
  return <Card {...genus} textColor={textColor} bgColor={bgColor} />;
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
  return <Card {...genus} textColor={textColor} />;
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

export const CollectionFixtureNoTab = (_, { fixture }) => <Card {...fixture} />;
CollectionFixtureNoTab.storyName = 'fixture setting: singleTab';
CollectionFixtureNoTab.parameters = {
  fixtures: {
    collection: pantheraCollection,
  },
};

export const CollectionFixture = (_, { fixture }) => <Card {...fixture} />;
CollectionFixture.parameters = {
  fixtures: {
    __singleTab: true,
    collection: pantheraCollection,
  },
};

export const ObjectFixture = (_, { fixture }) => {
  return <Card {...fixture} />;
};
ObjectFixture.parameters = {
  fixtures: {
    'Panthera Genus': pantheraData,
    'Keyed collection': keyBy(pantheraCollection, 'description'),
  },
};

export const RemoteFixture = (_, { fixture }) => <Card {...fixture} />;
RemoteFixture.parameters = {
  fixtures: {
    Neofelis: {
      'Clouded Leopard': 'fetch::./local-data.json',
      'Sunda Clouded Leopard':
        'fetch::https://en.wikipedia.org/api/rest_v1/page/summary/Sunda_clouded_leopard',
    },
  },
};

export const StringValueFixture = (_, { fixture }) => (
  <h1 className="font-sans text-white">{fixture}</h1>
);
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

export const NoFixture = () => (
  <Card
    title="No fixture"
    extract_html="<p>For testing fixture state when switching to stories which don’t use it.</p>"
  />
);

export const DisabledFixture = () => (
  <Card
    title="Disable fixture"
    extract_html="<p>For testing fixture state when switching to stories which disable it.</p>"
  />
);
DisabledFixture.parameters = {
  fixtures: { disable: true },
};
