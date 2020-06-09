# storybook-fixtures

Add data fixtures to your components by using local data (JSON files or hardcoded) or even URLs to fetch the data from.

[![React examples](https://img.shields.io/badge/react-blueviolet?style=for-the-badge&logo=storybook&label=examples)](https://tyom.github.io/storybook-addons/react)
[![Vue examples](https://img.shields.io/badge/vue-brightgreen?style=for-the-badge&logo=storybook&label=examples)](https://tyom.github.io/storybook-addons/vue)
[![HTML examples](https://img.shields.io/badge/html-blue?style=for-the-badge&logo=storybook&label=examples)](https://tyom.github.io/storybook-addons/html)

![storybook-fixtures screenshot](https://raw.githubusercontent.com/tyom/storybook-addons/master/docs/storybook-fixtures.png)

## Install

```
npm install -D storybook-fixtures
```

Add `storybook-fixtures` to your addons list in `.storybook/main.js`
```js
module.exports = {
  addons: ['storybook-fixtures']
};
```

A new 'Fixtures' panel will appear which contains fixture sections as sub tabs.
Fixture sections contain fixture variants which can be toggled by clicking or
keyboard shortcuts - keys `1` to `9` correspond to the first 9 variants. 

Variants can also be switched in sequentially using Vim-style navigation keys:
`j` and `k` to go up and down the variant list. 

Section tabs can be switched using `h` and `l` to switch to left and right
tab respectively.

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
      // fixture sections (key is label)
      variantTypes: {
        // variants (key is label)
        'Text fixture': 'Lorem ipsum',
        'Array fixture': ['One', 'Two'],
        'Object fixture': {
          title: 'Tiger',
          description: 'Largest species of the cat family',
        },
        'My remote fixture': 'https://example.com/data.json'
      }
    }  
  }
}
``` 

Each variant value can be be a URL, in which case it'll be fetched and
the result returned as its value.

## Imports

### withFixtures

Fixtures decorator which communicates with Storybook Fixtures panel and shows selected fixture variants.

### keyBy

Export of Lodash utility to convert a collection (array of objects) to object, to grouped by a chosen key.
