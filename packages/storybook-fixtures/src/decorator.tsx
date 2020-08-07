/* global window */
import qs from 'qs';
import { useEffect } from '@storybook/client-api';
import addons, { makeDecorator, StoryContext } from '@storybook/addons';
import { useLocalStorage } from '@rehooks/local-storage';
import VariantSelector from './variant-selector';
import { StateQuery } from './types';
import { ADDON_ID, PARAM_KEY, Events } from '.';

const variantSelector = new VariantSelector();
let selectedVariants: number[] = [];

export const withFixtures = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_KEY,
  wrapper: (
    storyFn: (context: StoryContext) => any,
    context,
    { options = {}, parameters = {} }
  ) => {
    const channel = addons.getChannel();
    const urlQuery: StateQuery = qs.parse(window.location.search);

    variantSelector.processInput({
      ...options,
      ...parameters,
    });

    const [storiesState, setStoriesState] = useLocalStorage(ADDON_ID, {});
    const { query } = storiesState[context.id] || {};
    const currentStoryState = VariantSelector.fromQuery(query);
    selectedVariants = [...currentStoryState.selectedVariants];

    function getStoryQuery(sectionIdx, variantIdx?) {
      if (typeof variantIdx !== 'undefined') {
        selectedVariants[sectionIdx] = variantIdx;
      }
      return VariantSelector.toQuery({
        selectedSectionIdx: sectionIdx,
        selectedVariants,
      });
    }

    function updateLocalState({ sectionIdx, variantIdx }) {
      setStoriesState({
        ...storiesState,
        [context.id]: {
          query: getStoryQuery(sectionIdx, variantIdx),
        },
      });
    }

    // Initialise from query or local storage
    variantSelector.applyQuery(urlQuery.fixtures || query);

    useEffect(() => {
      channel.emit(Events.INIT, variantSelector);
      channel.on(Events.SELECT_FIXTURE, updateLocalState);
    }, []);

    return storyFn({
      ...context,
      fixtures: variantSelector.selectedVariants,
      fixture: variantSelector.activeVariant,
    });
  },
});
