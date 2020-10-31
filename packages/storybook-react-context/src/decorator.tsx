/* global window */
import React from 'react';
import { makeDecorator, StoryContext } from '@storybook/addons';
import { ADDON_ID, PARAM_KEY } from '.';

const DefaultContext = React.createContext({
  default: true,
});

function defaultReducer(state, action) {
  return {
    ...state,
    ...action,
  };
}

const ContextWrapper = ({ context, children }) => {
  if (typeof children !== 'function') {
    throw new Error('ContextWrapper children must be a function');
  }
  return children(React.useContext(context));
};

export const withReactContext = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    { options, parameters = {} }
  ) => {
    if (options?.reducer && typeof options.reducer !== 'function') {
      throw new Error('Custom reducer argument must be a function');
    }
    const ReactContext = options?.context || DefaultContext;
    const reducer = options?.reducer || defaultReducer;

    return (
      <ReactContext.Provider value={React.useReducer(reducer, parameters)}>
        <ContextWrapper context={ReactContext}>
          {(ctx) =>
            storyFn({
              ...context,
              context: ctx,
            })
          }
        </ContextWrapper>
      </ReactContext.Provider>
    );
  },
});
