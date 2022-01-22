/* global window */
import React from 'react';
import { isPlainObject } from 'is-plain-object';
import { makeDecorator } from '@storybook/addons';
import type { StoryContext, WrapperSettings } from '@storybook/addons';
import { ADDON_ID, PARAM_KEY } from '.';

interface InitialContext {
  initialState?: Record<string, any>;
  reducer?: (state: any, action: any) => any;
  useReducer?: boolean;
  context?: React.Context<any>;
}

const DefaultContext = React.createContext({});

function defaultReducer(state, action) {
  return {
    ...state,
    ...action,
  };
}

export const withReactContext = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    {
      options,
      parameters = {},
    }: WrapperSettings & {
      options: InitialContext;
    }
  ) => {
    if (options?.reducer && typeof options.reducer !== 'function') {
      throw new Error('Custom reducer argument must be a function');
    }
    const ReactContext = options?.context || DefaultContext;
    const reducer = options?.reducer || defaultReducer;
    const initialState =
      isPlainObject(options?.initialState) && isPlainObject(parameters)
        ? {
            ...options.initialState,
            ...parameters,
          }
        : parameters || options?.initialState;
    const providerValue =
      options.useReducer === false
        ? initialState
        : React.useReducer(reducer, initialState);

    const ContextWrapper = ({ children }) => {
      const ctx = React.useContext(ReactContext);

      if (typeof children !== 'function') {
        throw new Error('ContextWrapper children must be a function');
      }
      return children(ctx);
    };

    return (
      <ReactContext.Provider value={providerValue}>
        <ContextWrapper>
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
