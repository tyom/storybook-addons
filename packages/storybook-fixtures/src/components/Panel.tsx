/* global document */
import qs from 'qs';
import store from 'store2';
import isPlainObject from 'lodash/isPlainObject';
import React, { useEffect, useState, useReducer } from 'react';
import { addons } from '@storybook/addons';
import { useStorybookApi } from '@storybook/api';
import { PREVIEW_KEYDOWN } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import PanelSection from './PanelSection';
import { KeyboardEvent, PreviewKeyDownEvent } from '../types';
import {
  getStoryFixturesState,
  parseFixturesQuery,
  stringifyStoryState,
} from '../fixtures';
import NoFixtures from './NoFixtures';
import Tabs from './Tabs';
import { Events, ADDON_ID } from '..';

type FixtureData = {};

interface IFixtureSettings {
  singleTab?: boolean;
}

interface IFixturesWithSettings {
  fixtures: FixtureData;
  settings: IFixtureSettings;
}

interface PanelState {
  fixtures: FixtureData;
  settings: IFixtureSettings;
  selectedSectionIdx: number;
  selectedVariantIdxs: number[];
}

const initialState: PanelState = {
  fixtures: {},
  settings: {},
  selectedSectionIdx: 0,
  selectedVariantIdxs: [],
};

const KEYCODE_NUMBER_1 = 49;
const KEYCODE_NUMBER_9 = 57;

const qsOptions = { encode: false, addQueryPrefix: true };

export function getEntries(obj = {}) {
  if (Array.isArray(obj)) {
    return obj.map((x, i) => [`Variant ${i + 1}`, x]);
  }
  if (isPlainObject(obj)) {
    return Object.entries(obj);
  }
  return [];
}

const stateReducer = (state, action): PanelState => {
  switch (action.type) {
    case 'SET_FIXTURES':
      return { ...state, fixtures: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_SECTION_IDX':
      return { ...state, selectedSectionIdx: action.payload };
    case 'SET_VARIANT_IDXS':
      return { ...state, selectedVariantIdxs: action.payload };
    default:
      return state;
  }
};

function buildQueryFromState(panelState, urlState) {
  const { path, queryParams } = urlState;
  const fixturesQueryParam = stringifyStoryState(
    panelState.selectedVariantIdxs,
    panelState.selectedSectionIdx
  );

  return {
    path,
    ...queryParams,
    fixtures: fixturesQueryParam,
  };
}

function setQuery(api, { fixtures, ...query }) {
  const newUrl = qs.stringify(query, qsOptions);
  api.setQueryParams({
    fixtures,
  });
  // Replace the URL with fixtures excluded as Storybook internally updates the URL
  // for args when setting query params which results in the previously set query in
  // the next selected story
  api.navigateUrl(newUrl, { replace: true });
}

function setStore(storyId, query) {
  const currentStore = store.local.get(ADDON_ID) || {};
  store.local.set(ADDON_ID, {
    ...currentStore,
    [storyId]: query.fixtures,
  });
}

export default function Panel() {
  const api = useStorybookApi();

  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [isInitialised, setIsInitialised] = useState(false);

  const channel = addons.getChannel();
  const entries = getEntries(state.fixtures);
  const sectionNames = Object.keys(state.fixtures);

  // Selecting individual story
  async function initialise(initialValues?: IFixturesWithSettings | null) {
    const { storyId } = api.getUrlState();
    const localStore = store.local.get(ADDON_ID) ?? {};

    if (initialValues) {
      dispatch({ type: 'SET_FIXTURES', payload: initialValues?.fixtures });
      dispatch({ type: 'SET_SETTINGS', payload: initialValues?.settings });
    }

    const fixturesQuery = storyId ? localStore[storyId] : '0:0';
    const { selectedSectionIdx, selectedVariantIdxs } = parseFixturesQuery(fixturesQuery);

    dispatch({ type: 'SET_SECTION_IDX', payload: selectedSectionIdx });
    dispatch({ type: 'SET_VARIANT_IDXS', payload: selectedVariantIdxs });

    setIsInitialised(true);
  }

  function handleVariantSelect(sectionIdx, variantIdx?): void {
    const newVariantIdxs = [...state.selectedVariantIdxs];
    newVariantIdxs.splice(sectionIdx, 1, variantIdx);

    dispatch({ type: 'SET_VARIANT_IDXS', payload: newVariantIdxs });
  }

  function handleSectionSelect(sectionIdx) {
    dispatch({ type: 'SET_SECTION_IDX', payload: sectionIdx });
  }

  function handlePreviewKeyDown({ event }: PreviewKeyDownEvent) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key, altKey, keyCode }: KeyboardEvent) {
    // Keys 1-9 with Alt pressed
    if (altKey && keyCode >= KEYCODE_NUMBER_1 && keyCode <= KEYCODE_NUMBER_9) {
      // Prevent from selecting the section tab that doesn't exist
      if (sectionNames.length - (keyCode - KEYCODE_NUMBER_1) < 1) return;
      // 0-based index of tab
      handleSectionSelect(0 - KEYCODE_NUMBER_1 + keyCode);
    }
    // Vim navigation: left/right to switch section tabs
    // Switch to right
    if (key === 'l' && state.selectedSectionIdx < sectionNames.length - 1) {
      handleSectionSelect(state.selectedSectionIdx + 1);
    }
    // Switch to left
    if (key === 'h' && state.selectedSectionIdx > 0) {
      handleSectionSelect(state.selectedSectionIdx - 1);
    }
  }

  function clearSelections() {
    dispatch({ type: 'SET_VARIANT_IDXS', payload: [] });
    store.local.remove(ADDON_ID);
  }

  useEffect(() => {
    channel.on(Events.INIT_PANEL, initialise);

    return () => {
      channel.off(Events.INIT_PANEL, initialise);
    };
  }, []);

  // Changing section
  useEffect(() => {
    if (sectionNames.length) {
      channel.on(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (sectionNames.length) {
        channel.off(PREVIEW_KEYDOWN, handlePreviewKeyDown);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [sectionNames.join('-'), state.selectedSectionIdx]);

  // Changing variant selection
  useEffect(() => {
    const { storyId, ...urlState } = api.getUrlState();

    if (!isInitialised || !storyId) return;

    const query = buildQueryFromState(state, urlState);
    const fixturesState = getStoryFixturesState(state.fixtures, query);

    channel.emit(Events.SELECT_FIXTURE, fixturesState);

    setStore(storyId, query);
    setQuery(api, query);
  }, [state.selectedVariantIdxs, state.selectedSectionIdx, isInitialised]);

  if (!isInitialised) {
    return null;
  }

  const selectedVariantIdx = state.selectedVariantIdxs[state.selectedSectionIdx];
  const tabs = entries.map(([label, contents], idx) => ({
    label: (
      <StyledTabButtonContent>
        <span className="tab-label">{label}</span>
        {entries.length > 1 && idx + 1 <= 9 && (
          <span className="tab-label-key">alt+{idx + 1}</span>
        )}
      </StyledTabButtonContent>
    ),
    panel: (
      <PanelSection
        key={label}
        active={state.selectedSectionIdx === idx}
        fixtureContents={contents}
        sectionIdx={idx}
        selectedFixtureIdx={selectedVariantIdx}
        onSelect={handleVariantSelect}
      />
    ),
  }));

  if (tabs.length === 0) {
    return <NoFixtures />;
  }

  return (
    <Tabs
      tabs={tabs}
      singleTab={state.settings.singleTab}
      activeIdx={state.selectedSectionIdx}
      onTabClick={handleSectionSelect}
      onResetSelections={clearSelections}
    />
  );
}

const StyledTabButtonContent = styled.span`
  .tab-label-key {
    display: inline-block;
    margin-left: 0.5rem;
    text-transform: uppercase;
    background-color: #0002;
    color: ${({ theme }) => theme.barTextColor};
    font-size: 9px;
    padding: 0.2rem 0.3rem;
    border-radius: 3px;
  }
`;
