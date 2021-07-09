/* global window */
import qs from 'qs';
import { useEffect, useState, useRef, useParameter } from '@storybook/client-api';
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
    const urlQuery: SelectionUrlQuery = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    const fixturesInput = useParameter(PARAM_KEY) as {};

    const { fixtures: initialFixtures, settings } = processInput(fixturesInput);
    const [fixtures, setFixtures] = useState(initialFixtures);
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
      const isRemote =
        typeof activeVariant === 'string' && activeVariant.startsWith('fetch::');
      // In isolated iframe view. State is restored from encoded fixtures query
      // Except for remote fetches. Those need to be done in the initialisation phase.
      const parentParams = new URLSearchParams(window.parent.location.search);
      const isIsolated = Boolean(parentParams.get('id'));

      if (isIsolated && !isRemote) {
        return undefined;
      }

      if (isRemote) {
        fetchRemotes(fixtures).then((resolvedFixtures) => {
          setFixtures(resolvedFixtures);

          channel.emit(Events.INIT_PANEL, {
            fixtures: resolvedFixtures,
            settings,
          });
        });
      } else {
        channel.emit(Events.INIT_PANEL, {
          fixtures,
          settings,
        });
      }

      channel.on(Events.SELECT_FIXTURE, updateLocalState);

      return () => {
        channel.off(Events.SELECT_FIXTURE, updateLocalState);
        // Unset fixtures to avoid it persisting to the next story
        channel.emit(Events.INIT_PANEL);
      };
    }, []);

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
