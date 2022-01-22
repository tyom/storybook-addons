/* global window */
import qs from 'qs';
import { useEffect, useState, useParameter } from '@storybook/client-api';
import { addons, makeDecorator } from '@storybook/addons';
import type { StoryContext } from '@storybook/addons';
import { fetchRemotes } from './remotes';
import { processInput, getStoryFixturesState } from './fixtures';
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
    const urlQuery = qs.parse(global.parent.location.search, {
      ignoreQueryPrefix: true,
    });

    const fixturesInput = useParameter(PARAM_KEY) as {};
    const { fixtures: initialFixtures, settings } = processInput(fixturesInput);

    const [fixtures, setFixtures] = useState(initialFixtures);

    const initialFixturesState = getStoryFixturesState(fixtures, urlQuery);

    const [selectedVariants, setSelectedVariants] = useState(
      initialFixturesState.selectedVariants
    );
    const [activeVariant, setActiveVariant] = useState(
      initialFixturesState.activeVariant
    );

    const isRemote =
      typeof activeVariant === 'string' && activeVariant.startsWith('fetch::');
    // In isolated iframe view. State is restored from encoded fixtures query
    // Except for remote fetches. Those need to be done in the initialisation phase.
    const isIsolated = Boolean(urlQuery.id);

    function handleFixtureSelect(fixturesState) {
      if (!fixturesState.activeVariant) return;

      setSelectedVariants(fixturesState.selectedVariants);
      setActiveVariant(fixturesState.activeVariant);
    }

    useEffect(() => {
      channel.on(Events.SELECT_FIXTURE, handleFixtureSelect);

      return () => {
        channel.off(Events.SELECT_FIXTURE, handleFixtureSelect);
      };
    }, []);

    useEffect(() => {
      if (isRemote) {
        fetchRemotes(fixtures).then((resolvedFixtures) => {
          if (isIsolated) {
            const fixturesState = getStoryFixturesState(resolvedFixtures, urlQuery);
            channel.emit(Events.SELECT_FIXTURE, fixturesState);
          } else {
            setFixtures(resolvedFixtures);

            channel.emit(Events.INIT_PANEL, {
              fixtures: resolvedFixtures,
              settings,
            });
          }
        });
      } else {
        channel.emit(Events.INIT_PANEL, {
          fixtures,
          settings,
        });
      }
    }, [urlQuery.fixtures]);

    return storyFn({
      ...context,
      fixtures: selectedVariants,
      fixture: activeVariant,
    });
  },
});
