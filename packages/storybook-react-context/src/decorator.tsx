/* global window */
import React from 'react';
import { isPlainObject } from 'is-plain-object';
import { makeDecorator, useArgs } from '@storybook/addons';
import type { StoryContext, WrapperSettings } from '@storybook/addons';
import { ADDON_ID, PARAM_KEY } from '.';

type StoryState = Record<string, any>;
interface ContextOptions {
  initialState?: StoryState;
  reducer?: (state: any, action: any) => any;
  useProviderValue?: (initialState: any, args) => any;
  Context?: React.Context<any>;
}

const DefaultContext = React.createContext({});

export const withReactContext = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    {
      options = {},
      parameters = {},
    }: WrapperSettings & {
      options: ContextOptions;
    }
  ) => {
    if (options.reducer && typeof options.reducer !== 'function') {
      throw new Error('Custom reducer argument must be a function');
    }
    if (options.useProviderValue && typeof options.useProviderValue !== 'function') {
      throw new Error('useProviderValue hook must be a function');
    }
    if (options.reducer && options.useProviderValue) {
      // eslint-disable-next-line no-console
      console.warn(
        'Both custom reducer and useProviderValue hook are defined. Since both affect the provider value, only one should be used; otherwise, the useProviderValue takes priority.'
      );
    }

    const [args] = useArgs();
    const { initialState, useProviderValue, reducer, Context } = {
      ...options,
      ...parameters,
    };
    const state = isPlainObject(initialState)
      ? {
          ...options.initialState,
          ...parameters.initialState,
        }
      : initialState;

    let providerValue = state;
    if (useProviderValue) {
      providerValue = useProviderValue?.(state, args);
    } else if (reducer) {
      providerValue = React.useReducer(reducer, state);
    }

    const LocalContext = Context || DefaultContext;

    const ContextWrapper = ({ children }) => {
      const ctx = React.useContext(LocalContext);

      if (typeof children !== 'function') {
        throw new Error('ContextWrapper children must be a function');
      }
      return children(ctx);
    };

    return (
      <LocalContext.Provider value={providerValue}>
        <ContextWrapper>
          {(ctx) =>
            storyFn({
              ...context,
              context: ctx,
            })
          }
        </ContextWrapper>
      </LocalContext.Provider>
    );
  },
});
