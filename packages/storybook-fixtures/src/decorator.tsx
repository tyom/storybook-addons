/* global window */
import qs from 'qs';
import { useEffect, useState, useRef } from '@storybook/client-api';
import addons, { makeDecorator, StoryContext } from '@storybook/addons';
import { writeStorage } from '@rehooks/local-storage';
import { SelectionUrlQuery } from './types';
import { fetchRemotes } from './remotes';
import { processInput, stringifyStoryState, getStoryFixturesState } from './fixtures';
import { ADDON_ID, PARAM_KEY, Events } from '.';

export const withFixtures = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    { options = {}, parameters = {} }
  ) => {
    const channel = addons.getChannel();
    const urlQuery: SelectionUrlQuery = qs.parse(window.location.search);

    const fixturesInput = {
      ...options,
      ...parameters,
    };

    const { fixtures: initialFixtures, settings } = processInput(fixturesInput);
    const [fixtures, setFixtures] = useState(initialFixtures);
    const [initialised, setInitialised] = useState(false);
    const [localState, setLocalState] = useState(
      JSON.parse(window.localStorage.getItem(ADDON_ID) || '{}')
    );
    const serialisedLocalState = JSON.stringify(localState);

    const {
      selectedVariants,
      activeVariant,
      selectedVariantIdxs,
    } = getStoryFixturesState({
      fixtures,
      storyId: context.id,
      localState,
      urlQuery: urlQuery.fixtures,
    });

    const selectedVariantIdxsRef = useRef(selectedVariantIdxs);

    async function initialise() {
      try {
        const resolvedFixtures = await fetchRemotes(fixtures);
        setFixtures(resolvedFixtures);
        setInitialised(true);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Some requests have failed.', err);
      }
    }

    function getStoryQuery(sectionIdx, variantIdx?) {
      const variantIdxs: number[] = selectedVariantIdxsRef.current;
      if (typeof variantIdx !== 'undefined') {
        variantIdxs[sectionIdx] = variantIdx;
      }
      return stringifyStoryState(variantIdxs, sectionIdx);
    }

    function updateLocalState(state) {
      if (!state) {
        setLocalState({});
        selectedVariantIdxsRef.current = [];
        return;
      }
      setLocalState({
        ...localState,
        [context.id]: {
          query: getStoryQuery(state.sectionIdx, state.variantIdx),
        },
      });
    }

    useEffect(() => {
      initialise();
      channel.on(Events.SELECT_FIXTURE, updateLocalState);

      return () => {
        channel.off(Events.SELECT_FIXTURE, updateLocalState);
        // Unset fixtures to avoid it persisting to the next story
        channel.emit(Events.INIT_PANEL);
      };
    }, []);

    useEffect(() => {
      if (initialised) {
        channel.emit(Events.INIT_PANEL, {
          fixtures,
          settings,
        });
      }
    }, [initialised]);

    useEffect(() => {
      writeStorage(ADDON_ID, localState);
    }, [serialisedLocalState]);

    return storyFn({
      ...context,
      fixtures: selectedVariants,
      fixture: activeVariant,
    });
  },
});
