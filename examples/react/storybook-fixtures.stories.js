import React from 'react';
import {
  FormGroup,
  InputGroup,
  Button,
  Card,
  Classes,
  H5,
} from '@blueprintjs/core';
import { createFixtureInput, useRemoteFixture } from 'storybook-fixtures';
import '@blueprintjs/core/lib/css/blueprint.css';
import mockCollection from '../__fixtures__/mock-collection.json';
import mockObject from '../__fixtures__/mock-object.json';

export default {
  title: 'storybook-fixtures',
};

const UserCard = ({ first_name, last_name, email, description }) => (
  <Card>
    <H5>{[first_name, last_name].join(' ')}</H5>
    <FormGroup label="Label" labelFor="text-input" labelInfo="(required)">
      <InputGroup readOnly value={email} />
    </FormGroup>
    <p>{description}</p>
    <Button text="Save" className={Classes.BUTTON} />
  </Card>
);

const collectionFixtureInput = createFixtureInput(mockCollection);
const objectFixtureInput = createFixtureInput(mockObject);
const objectFixtureInput2 = createFixtureInput(
  mockObject,
  (variant, key) => `${key} - ${variant.last_name}`
);

export const collectionFixture = () => {
  const fixture = collectionFixtureInput('Select variant:', {
    type: 'radio',
    initial: 'Variant 5',
  });
  return <UserCard {...fixture} />;
};

export const objectFixtureRadio = () => {
  const fixture = objectFixtureInput('Select variant', {
    type: 'inline-radio',
  });

  return <UserCard {...fixture} />;
};

export const objectFixtureSelect = () => {
  const fixture = objectFixtureInput2('Select variant');

  return <UserCard {...fixture} />;
};

export const remoteFixture = () => {
  const input = useRemoteFixture('./mock-collection.json', 'first_name');
  const fixture = input('Select variant:', {
    type: 'radio',
  });

  if (!fixture) {
    return null;
  }

  return <UserCard {...fixture} />;
};
