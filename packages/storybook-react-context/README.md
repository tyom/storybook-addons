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

The decorator can also be preconfigured for all stories in the module:

```js
export default {
  title: 'some story',
  decorators: [
    withReactContext({
      Context: ExampleContext,
      initialState: { authenticated: false },
    }),
  ],
};
```

### Options

`withReactContext` takes an argument which is an object with the following optional properties:

- `Context` - The context returned by `React.createContext` to provide for story's components
- `reducer(state, action)` - custom reducer to produce the provider value or;
- `useProviderValue(state, args)` - a function (hook) to be used to derive the provider value (provides story args as second argument to link with Storybook Controls)
- `initialState` - the initial state to use for the provider value

The decorator options can also be se set in story parameters using `reactContext` key:

```js
someComponent.parameters = {
  reactContext: {
    initialState: {
      defaultValue: true,
    },
    reducer: (state, action) => ({ ...state, action })
  }
};
```

Component will be wrapped with another component which uses the context hook and returns
it to the story via story context as the result of `React.useReducer` with `reducer`
function and `initialState`.

The `useProviderValue` hook can be used to link the context with Storybook Controls.

```js
import { withReactContext } from 'storybook-react-context';

export const myStory = ({ myValue }) => (
  <button onClick={() => dispatch({ text: 'Changed' })}>{state.text}</button>
);
myStory.args = {
  myValue: true,
}
myStory.decorators = [withReactContext];
myStory.parameters.reactContextState = {
  useProviderValue: (state, args) => args
};
```
