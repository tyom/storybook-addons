# storybook-fixtures

Add data fixtures to your components by using local data (JSON files or hardcoded) or even URLs to fetch the data from.

[![react examples](https://img.shields.io/badge/react-blueviolet?style=for-the-badge&logo=storybook&label=examples)](https://tyom.github.io/storybook-addons/react)
[![vue examples](https://img.shields.io/badge/vue-brightgreen?style=for-the-badge&logo=storybook&label=examples)](https://tyom.github.io/storybook-addons/vue)

![storybook-fixtures screenshot](https://raw.githubusercontent.com/tyom/storybook-addons/master/docs/storybook-fixtures.png)

## Install

```
npm install -D storybook-fixtures
```

Add `storybook-fixtures` to your addons list in `.storybook/main.js`
```js
module.exports = {
  addons: ['storybook-fixtures'],
};
```

A new 'Fixtures' panel will appear which contains fixture sections as sub tabs.
Fixture sections contain fixture variants which can be toggled by clicking or
keyboard shortcuts - keys `1` to `9` correspond to the first 9 variants. 

## Usage

Fixture definitions must contain fixture section name as key and variants as
its properties.

```js
import { withFixtures } from 'storybook-fixtures';
import pantheraData from '../__fixtures__/panthera.json';

// Global fixtures available in all stories for a given module
export default {
  title: 'storybook-fixtures',
  decorators: [
    withFixtures({
      // fixture sections
      collection: pantheraData,
    }),
  ],
};

// Currently selected fixture is injected in story context
export const myLocalFixture = ({ fixture }) => {
  return <MyComponent data={fixture} />;
};

// Fixtures that have strings as values are assumed remote URL and will be fetched
// when the story is selected.
export const myRemoteFixture = ({ fixture }) => {
  return <MyComponent data={fixture} />;
};
// Fixtures can be added per story via story parameters
myRemoteFixture.story = {
  parameters: {
    fixtures: {
      // fixture sections
      remoteFixtures: {
        // variants
        'My remote fixture': 'https://example.com/data.json'
      }
    }  
  }
}
``` 

Each variant can be either contain the data, or a URL to fetch the data. The data
for all URLs (a variant string value is assumed as URL) will be fetched when the
fixture section is selected.  

## Imports

### withFixtures

Fixtures decorator which communicates with Storybook Fixtures panel and shows selected fixture variants.

### keyBy

Export of Lodash utility to convert a collection (array of objects) to object, to grouped by a chosen key.
