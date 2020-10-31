# storybook-react-context

Manipulate React context inside Storybook. Read state and dispatch updates from outside of React component.

[![React examples](https://img.shields.io/badge/react-blueviolet?style=for-the-badge&logo=storybook&label=examples)](https://tyom.github.io/storybook-addons/react/?path=/story/storybook-react-context)

## Install

```
npm install -D storybook-react-context
```

## Usage

Add `withReactContext` decorator where needed, per component or globally.

```js
import { withReactContext } from 'storybook-react-context';

export default {
  title: 'some story',
  decorators: [withReactContext],
};
```

### Options

`withReactContext` takes an argument which is an object with two keys (both optional):

- `context` - custom context returned by `React.createContext`
- `reducer` - custom reducer (defaults to a simple assignment of dispatch action on the current state)

Initial context state can be set in parameters using `initialState` key:

```js
someComponent.parameters = {
  initialState: {
    defaultValue: true,
  },
};
```

Component will be wrapped with another component which uses the context hook and returns
it to the story via story context.

```js
import { withReactContext } from 'storybook-react-context';

export const myStory = (_, { context: { state, dispatch } }) => (
  <button onClick={() => dispatch({ text: 'Changed' })}>{state.text}</button>
);
myStory.decorators = [withReactContext];
myStory.parameters.initialState = {
  initialState: {
    text: 'Initial',
  },
};
```
