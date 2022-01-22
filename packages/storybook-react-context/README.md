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

`withReactContext` takes an argument which is an object with the following optional properties:

- `context` - custom context returned by `React.createContext`
- `reducer` - custom reducer (defaults to a simple assignment of dispatch action on the current state)
- `useReducer` - when set to `false` avoids using `useReducer` hook in provider value, instead pass the `initialState` directly
- `initialState` - initial state to use in useReducer for context provider value

Initial context state can also be set in parameters using `initialState` key:

```js
someComponent.parameters = {
  initialState: {
    defaultValue: true,
  },
};
```

When both `initialState` values (in decorator argument and parameters) are objects
they are combined (assigned), otherwise the either `initialState` in parameters or
decorator argument will be used (in that order).

Component will be wrapped with another component which uses the context hook and returns
it to the story via story context as the result of `React.useReducer` with `reducer`
function and `initialState`.

```js
import { withReactContext } from 'storybook-react-context';

export const myStory = (_, { context: [state, dispatch] }) => (
  <button onClick={() => dispatch({ text: 'Changed' })}>{state.text}</button>
);
myStory.decorators = [withReactContext({
  initialState: {
    title: 'Initial #1'
  }
})];
myStory.parameters.initialState = {
  initialState: {
    text: 'Initial #2',
  },
};
```
