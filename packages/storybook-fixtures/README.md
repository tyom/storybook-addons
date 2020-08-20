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
  addons: ['storybook-fixtures'],
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
      // override the default setting and show single fixture tab
      __singleTab: true,
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
myRemoteFixture.parameters = {
  fixtures: {
    // fixture sections (key is a tab label for multiple variant sets)
    variantTypes: {
      // variants (key is label)
      'Text fixture': 'Lorem ipsum',
      'Array fixture': ['One', 'Two'],
      'Object fixture': {
        title: 'Tiger',
        description: 'Largest species of the cat family',
      },
      'My remote fixture': 'https://example.com/data.json',
    },
  },
};
```

Variants can be grouped into sets and controlled independently. When only one
set is defined the set tab is hidden.

Any selections are stored in local storage and any fixture selections can be
opened in a new tab in isolation (without Storybook UI). The selection is encoded
in a query string. 

Each variant value can be a URL, in which case it'll be fetched, and
the result returned as its value.

In Storybook v6 the add-on automatically includes the fixtures decorator globally.
Just add `storybook-fixtures` to the `addons` array in `main.js` and any story
can receive fixtures object using `parameters` static property (see above). 

### Fixture Settings

`withFixtures` decorator has special properties prefixed with double underscore.
These properties can change certain behaviour of how fixtures are displayed.

- `__singleTab` (defaults to `false`) - Fixtures are grouped into multiple tabs. Each key
  in the fixtures object is mapped to the tab. When there's only a single property in the
  fixture object the single tab is not shown by default.

## Imports

### withFixtures

Fixtures decorator which communicates with Storybook Fixtures panel and shows selected fixture variants.

### keyBy

Export of Lodash utility to convert a collection (array of objects) to object, to grouped by a chosen key.
