# storybook-fixtures

Add static fixtures to your components by using local JSON files or remote endpoints.

## Install

```
npm install -D storybook-fixtures 
```

## Usage

```js
import { createFixtureInput, useRemoteFixture } from 'storybook-fixtures';
import mockCollection from './mock-collection.json';

const MyComponent = ({ data }) => <div>{JSON.stringify(data)}</div>;

// Map data to Storybook Knobs. Data must be and object with keys 
// mapped to variants, or an array of objects, which automatically 
// map to variants.
// Second argument is a variant object key to use for knob option label.
// Can be a function which receives variant object as its argument. 
const collectionFixtureInput = createFixtureInput(mockCollection, 'title');

export const myLocalFixture = () => {
  // Storybook knob is created and currently selected variant is stored in variable   
  const fixture = collectionFixtureInput('Select variant:', {
    type: 'radio', // radio, inline-radio, select
    initial: 'option-5', // initially selected option
  });
  return <MyComponent data={fixture} />;
};

export const myRemoteFixture = () => {
  // Hook which fetches data when component is mounted
  const input = useRemoteFixture('http://example.com/mock-data.json');
  // Storybook knob is created and currently selected variant is stored in variable
  const fixture = input('Select variant:', {
    type: 'select',
  });
  // Avoid unpopulated component render
  if (!fixture) {
    return null;
  }

  return <MyComponent data={fixture} />;
};

```
