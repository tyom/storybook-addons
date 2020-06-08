import qs from 'qs';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { useEffect } from '@storybook/client-api';
import addons, { makeDecorator, StoryContext } from '@storybook/addons';
import { fetchRemotes } from './Panel';
import { ADDON_ID, PARAM_KEY, Events } from '.';

// TODO
// Avoid relying on module level variable.
// A better way would be to use hooks but Storybook's own cross-framework useState,
// unlike useEffect is not in v5. It's supposed to be in v6 though
let selectedVariant;

function getVariant(fixtures = {}, sectionId, idx = 0) {
  const entries = Object.entries(fixtures);
  if (!entries.length) {
    return {};
  }
  const [firstFixtureKey] = entries[0];
  const variants = Object.entries(fixtures[sectionId || firstFixtureKey]);
  const [, variant] = variants[idx] || [];

  return variant;
}

export const withFixtures = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    { options = {}, parameters = {} }
  ) => {
    // eslint-disable-next-line no-undef
    const query = qs.parse(window.location.search);
    const storyOptions = {
      ...options,
      ...parameters,
    };

    const channel = addons.getChannel();
    const fixtureKeys = Object.keys(storyOptions);
    if (!fixtureKeys.length) {
      selectedVariant = {};
    }

    // Initialise to static fixture (in manager)
    const initialVariant = getVariant(storyOptions, query.fixture, query.variant);

    function handleFixtureChange({ fixtures, sectionId, variantIdx }) {
      selectedVariant = getVariant(fixtures, sectionId, variantIdx);
      channel.emit(FORCE_RE_RENDER);
    }

    useEffect(() => {
      channel.emit(Events.INIT, storyOptions);
      channel.on(Events.CHANGE, handleFixtureChange);

      // Fetch remote data and rerender in stand-alone preview iframe
      if (query.fixture && query.variant) {
        fetchRemotes(storyOptions).then((resolvedFixtures) => {
          selectedVariant = getVariant(resolvedFixtures, query.fixture, query.variant);
          channel.emit(FORCE_RE_RENDER);
        });
      }

      return () => {
        channel.off(Events.CHANGE, handleFixtureChange);
        selectedVariant = null;
        channel.emit(Events.INIT, {});
      };
    }, []);

    return storyFn({
      ...context,
      fixture: selectedVariant || initialVariant,
    });
  },
});
