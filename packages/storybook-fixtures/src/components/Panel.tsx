/* global document */
import qs from 'qs';
import isPlainObject from 'lodash/isPlainObject';
import React, { useEffect, useState } from 'react';
import addons from '@storybook/addons';
import { useStorybookApi } from '@storybook/api';
import { PREVIEW_KEYDOWN } from '@storybook/core-events';
import { useLocalStorage } from '@rehooks/local-storage';
import { styled } from '@storybook/theming';
import PanelSection from './PanelSection';
import { KeyboardEvent, PreviewKeyDownEvent } from '../types';
import { parseStoryState, stringifyStoryState } from '../fixtures';
import { Tabs } from './Tabs';
import { ADDON_ID, Events } from '..';

type FixtureData = {};

interface IFixtureSettings {
  singleTab?: boolean;
}

interface IFixturesWithSettings {
  fixtures: FixtureData;
  settings: IFixtureSettings;
}

const fixtureExample = `
myStory.parameters = {
  fixtures: {
    'Section name (tab)': {
      'Variant name': {
         // fixture data
       }
    }
  }
}
`.trim();

function EmptyPlaceholder() {
  return (
    <Placeholder>
      <div className="content">
        <h3>No fixtures</h3>
        <p>Add story fixtures using `fixtures` story parameter.</p>
        <code>{fixtureExample}</code>
      </div>
    </Placeholder>
  );
}

export function getEntries(obj = {}) {
  if (Array.isArray(obj)) {
    return obj.map((x, i) => [`Variant ${i + 1}`, x]);
  }
  if (isPlainObject(obj)) {
    return Object.entries(obj);
  }
  return [];
}

export default function Panel() {
  const api = useStorybookApi();
  const { storyId = '' } = api.getUrlState();

  const [storiesState] = useLocalStorage(ADDON_ID, {});
  const { selectedSectionIdx, selectedVariantIdxs } = getCurrentStoryState();
  const [fixtures, setFixtures] = useState<FixtureData>({});
  const [fixtureSettings, setFixtureSettings] = useState<IFixtureSettings>({});

  const selectedVariantIdx = selectedVariantIdxs[selectedSectionIdx];
  const [activeSectionIdx, setActiveSectionIdx] = useState(selectedSectionIdx);
  const [initialisedValues, setInitialisedValues] = useState(false);

  const channel = addons.getChannel();
  const entries = getEntries(fixtures);
  const sectionNames = Object.keys(fixtures);

  async function initialise(initialValues?: IFixturesWithSettings | null) {
    if (!initialValues) {
      setFixtures({});
      setFixtureSettings({});
      setInitialisedValues(false);
      return;
    }
    setFixtures(initialValues.fixtures);
    setFixtureSettings(initialValues.settings);
    // Initialise to first section to avoid trying to select non-existing section in the following story
    setActiveSectionIdx(0);
    setInitialisedValues(true);
  }

  function getCurrentStoryState() {
    const currentStory = storiesState[storyId] || {};
    return parseStoryState(currentStory.query);
  }

  function selectVariant(sectionIdx, variantIdx?): void {
    setActiveSectionIdx(sectionIdx);

    channel.emit(Events.SELECT_FIXTURE, {
      sectionIdx,
      variantIdx,
    });
  }

  function selectSection(sectionIdx) {
    setActiveSectionIdx(sectionIdx);
    channel.emit(Events.SELECT_FIXTURE, {
      sectionIdx,
    });
  }

  function handlePreviewKeyDown({ event }: PreviewKeyDownEvent) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key, altKey, keyCode }: KeyboardEvent) {
    // Keys 1-9 with Alt pressed
    if (altKey && keyCode >= 49 && keyCode <= 57) {
      // 0-based index of tab
      selectSection(-49 + keyCode);
    }
    // Vim navigation: left/right to switch section tabs
    // Switch to right
    if (key === 'l' && activeSectionIdx < sectionNames.length - 1) {
      selectSection(activeSectionIdx + 1);
    }
    // Switch to left
    if (key === 'h' && activeSectionIdx > 0) {
      selectSection(activeSectionIdx - 1);
    }
  }

  function handleResetSelections() {
    channel.emit(Events.SELECT_FIXTURE, null);
  }

  useEffect(() => {
    channel.on(Events.INIT_PANEL, initialise);

    return () => {
      channel.off(Events.INIT_PANEL, initialise);
    };
  }, []);

  useEffect(() => {
    if (sectionNames.length) {
      channel.on(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (sectionNames.length) {
        document.removeEventListener('keydown', handleKeyDown);
        channel.off(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      }
    };
  }, [JSON.stringify(sectionNames), activeSectionIdx]);

  useEffect(() => {
    const urlState = api.getUrlState();
    const newQuery = {
      ...urlState.queryParams,
      fixtures: stringifyStoryState(selectedVariantIdxs, activeSectionIdx),
      path: urlState.path,
    };

    api.setQueryParams({
      fixtures: newQuery.fixtures,
    });

    const newPath = qs.stringify(newQuery, { encode: false, addQueryPrefix: true });
    api.navigateUrl(newPath, {});
  }, [activeSectionIdx, selectedVariantIdxs.join('-')]);

  const createLabel = (label, key) => (
    <StyledTabButtonContent>
      <span className="tab-label">{label}</span>
      {entries.length > 1 && key <= 9 && <span className="tab-label-key">alt+{key}</span>}
    </StyledTabButtonContent>
  );

  const tabs = entries.map(([label, contents], idx) => ({
    label: createLabel(label, idx + 1),
    panel: (
      <PanelSection
        key={label}
        active={activeSectionIdx === idx}
        fixtureContents={contents}
        sectionIdx={idx}
        selectedFixtureIdx={selectedVariantIdx}
        onSelect={selectVariant}
      />
    ),
  }));

  if (initialisedValues && tabs.length === 0) {
    return <EmptyPlaceholder />;
  }

  if (tabs.length === 0) {
    return null;
  }

  return (
    <Tabs
      tabs={tabs}
      singleTab={fixtureSettings.singleTab}
      activeIdx={activeSectionIdx}
      onTabClick={selectSection}
      onResetSelections={handleResetSelections}
    />
  );
}

const Placeholder = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;

  .content {
    border: 2px solid #aaa3;
    padding: 2rem;
    margin: 1rem auto;
  }

  h3 {
    font-weight: 600;
    font-size: 1.4em;
  }

  code {
    white-space: pre;
    padding: 1rem;
    background-color: #0001;
    display: block;
    margin: 0 -1rem -1rem -1rem;
  }
`;

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
