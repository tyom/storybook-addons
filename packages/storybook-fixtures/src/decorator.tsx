/* global window */
import qs from 'qs';
import { isEmpty } from 'lodash';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import { useEffect } from '@storybook/client-api';
import addons, { makeDecorator, StoryContext } from '@storybook/addons';
import { fetchRemotes } from './remotes';
import { ADDON_ID, PARAM_KEY, Events } from '.';
import { PreviewQuery, Fixture, Variant, FixtureParameters } from './types';

// TODO
// Avoid relying on module level variable.
// A better way would be to use hooks but Storybook's own cross-framework useState,
// unlike useEffect is not in v5. It's supposed to be in v6 though
let selectedVariants;
let activeVariant: Variant | undefined;

function getVariant(fixtures = {}, sectionId: string, idx = 0): Variant {
  const entries = Object.entries(fixtures);
  if (!entries.length) {
    return {};
  }
  const [firstFixtureKey] = entries[0];
  const variants: [string, object][] = Object.entries(
    fixtures[sectionId || firstFixtureKey]
  );
  const [, variant] = variants[idx] || [];

  return variant;
}

function getVariantsFromQuery(fixtures: FixtureParameters, variantsQuery = '') {
  const [variantsString, activeSectionIdx = 0] = variantsQuery.split(':');
  const fixtureVariants = variantsString.split(',').map(Number);
  const entries = Object.entries(fixtures);
  const variantsFromQuery = entries.reduce((acc, [sectionKey, sectionValue], idx) => {
    const variantEntries = Object.entries(sectionValue);
    const variantIdx = fixtureVariants[idx] || 0;
    const [, variant] = variantEntries[Number(variantIdx)];
    return {
      ...acc,
      [sectionKey]: variant,
    };
  }, {});

  return [variantsFromQuery, Object.values(variantsFromQuery)[activeSectionIdx]];
}

function getDefaultVariants(fixturesObject): Variant[] {
  return Object.values(fixturesObject).map(
    (section: Fixture) => Object.values(section)[0]
  );
}

export const withFixtures = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    { options = {}, parameters = {} }
  ) => {
    const channel = addons.getChannel();
    const query: PreviewQuery = qs.parse(window.location.search);
    const fixtureEntries = Object.entries({
      ...options,
      ...parameters,
    });
    const fixtureSettings = {
      singleTab: false,
    };
    // extract special settings properties
    const fixturesObject = fixtureEntries.reduceRight((acc, [k, v]) => {
      if (k.startsWith('__')) {
        fixtureSettings[k.replace('__', '')] = v;
        return acc;
      }
      if (isEmpty(v)) return acc;
      return {
        [k]: v,
        ...acc,
      };
    }, {});

    if (fixtureEntries.length) {
      // set first item of each section as default value
      selectedVariants = selectedVariants || getDefaultVariants(fixturesObject);
      activeVariant = activeVariant || selectedVariants[0];
    } else {
      // Unset when no fixtures are given
      selectedVariants = {};
      activeVariant = undefined;
    }

    function handleFixtureChange({ fixtures, sectionId, variantIdx }) {
      selectedVariants[sectionId] = getVariant(fixtures, sectionId, variantIdx);
      activeVariant = selectedVariants[sectionId];
      channel.emit(FORCE_RE_RENDER);
    }

    useEffect(() => {
      channel.emit(Events.INIT, fixturesObject, fixtureSettings);
      channel.on(Events.CHANGE, handleFixtureChange);

      // Initialise from query
      [selectedVariants, activeVariant] = getVariantsFromQuery(
        fixturesObject,
        query.fixtures
      );

      // Fetch remote data and rerender in stand-alone preview iframe
      if (query.fixtures) {
        fetchRemotes(fixturesObject).then((resolvedFixtures) => {
          [selectedVariants, activeVariant] = getVariantsFromQuery(
            resolvedFixtures,
            query.fixtures
          );
          channel.emit(FORCE_RE_RENDER);
        });
      }

      return () => {
        channel.off(Events.CHANGE, handleFixtureChange);
        selectedVariants = undefined;
        activeVariant = undefined;
        channel.emit(Events.INIT, {});
      };
    }, []);

    const fixtures: Variant[] = Object.values(selectedVariants);

    return storyFn({
      ...context,
      fixtures,
      fixture: activeVariant,
    });
  },
});
