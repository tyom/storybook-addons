import React from 'react';
import { withReactContext } from 'storybook-react-context';

const Component = ({ children, color, loading, onClick }) => (
  <div className="font-sans max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
    {children}
    <hr />
    {loading && (
      <p id="context-loading" className="text-gray-600 my-6">
        Loading…
      </p>
    )}
    <p>
      Color:{' '}
      <span id="context-color" className={`p-2 bg-${color}`}>
        {color}
      </span>
    </p>
    {onClick && (
      <p className="mt-6">
        <button
          type="button"
          id="context-button"
          className="py-2 px-4 text-base rounded border-none bg-gray-300 hover:bg-gray-400"
          onClick={onClick}
        >
          Toggle colour
        </button>
      </p>
    )}
  </div>
);

const getNextColor = (currentColor) => {
  const colors = [
    'red-400',
    'green-400',
    'blue-400',
    'yellow-600',
    'purple-400',
    'pink-400',
  ];
  const currentIndex = colors.findIndex((c) => c === currentColor);
  const nextIndex = currentIndex + 1 === colors.length ? 0 : currentIndex + 1;
  return colors[nextIndex];
};

export default {
  title: 'storybook-react-context',
  decorators: [
    withReactContext({
      initialState: {
        color: 'blue-400',
      },
    }),
  ],
};

export const ChangeContextOnMount = (_, { context: [state, dispatch] }) => {
  React.useEffect(() => {
    if (state.loaded) return () => {};

    const timeout = setTimeout(() => {
      dispatch({
        loaded: true,
        color: 'red-400',
      });
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Component title="Context changes" color={state.color} loading={!state.loaded}>
      <h2>Context change on mount</h2>
      <p>
        Context is initialised with values, then updated after 2 seconds to emulate
        loading.
      </p>
    </Component>
  );
};

export const ChangeContextOnClick = (_, { context: [state, dispatch] }) => {
  function handleButtonToggle() {
    dispatch({
      color: getNextColor(state.color),
    });
  }

  return (
    <Component
      title="Context changes"
      color={state.color}
      loading={!state.loaded}
      onClick={handleButtonToggle}
    >
      <h2>Context change on click</h2>
      <p>Context is updated on button click.</p>
    </Component>
  );
};
ChangeContextOnClick.parameters = {
  initialState: {
    loaded: true,
  },
};
