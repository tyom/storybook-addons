/* global document */
import isPlainObject from 'lodash/isPlainObject';
import React, { useEffect, useState } from 'react';
import addons from '@storybook/addons';
import { useStorybookApi } from '@storybook/api';
import { Tabs } from '@storybook/components';
import { useLocalStorage } from '@rehooks/local-storage';
import { PREVIEW_KEYDOWN } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import { fetchRemotes } from '../remotes';
import PanelSection from './PanelSection';
import { KeyboardEvent, PreviewKeyDownEvent } from '../types';
import VariantSelector from '../variant-selector';
import { ADDON_ID, Events } from '..';

type FixtureData = {};

interface IFixtureSettings {
  singleTab?: boolean;
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

  if (!storyId) {
    return null;
  }

  const [storiesState] = useLocalStorage(ADDON_ID, {});
  const [fixtures, setFixtures] = useState<FixtureData>({});
  const [fixtureSettings, setFixtureSettings] = useState<IFixtureSettings>({});
  const { selectedSectionIdx, selectedVariants } = getCurrentStoryState();

  const selectedVariantIdx = selectedVariants[selectedSectionIdx];
  const [activeSectionIdx, setActiveSectionIdx] = useState(selectedSectionIdx);

  const channel = addons.getChannel();
  const entries = getEntries(fixtures);
  const sectionNames = Object.keys(fixtures);

  async function initialise(variantSelector) {
    try {
      const resolvedFixtures = await fetchRemotes(variantSelector.fixtures);
      setFixtures(resolvedFixtures);
      setFixtureSettings(variantSelector.settings);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Some requests have failed.', err);
    }
  }

  function getCurrentStoryState() {
    const currentStory = storiesState[storyId] || {};
    return VariantSelector.fromQuery(currentStory.query);
  }

  function handleVariantSelect({ sectionIdx, variantIdx }): void {
    channel.emit(Events.SELECT_FIXTURE, {
      sectionIdx,
      variantIdx,
    });
  }

  function handleSectionChange(id: string) {
    channel.emit(Events.SELECT_FIXTURE, {
      sectionIdx: sectionNames.findIndex((s) => s === id),
    });
  }

  function handlePreviewKeyDown({ event }: PreviewKeyDownEvent) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key, altKey, keyCode }: KeyboardEvent) {
    // Keys 1-9 with Alt pressed
    if (altKey && keyCode >= 49 && keyCode <= 57) {
      // 0-based index of tab
      setActiveSectionIdx(-49 + keyCode);
    }
    // Vim navigation: left/right to switch section tabs
    // Switch to right
    if (key === 'l' && activeSectionIdx < sectionNames.length - 1) {
      setActiveSectionIdx(activeSectionIdx + 1);
    }
    // Switch to left
    if (key === 'h' && activeSectionIdx > 0) {
      setActiveSectionIdx(activeSectionIdx - 1);
    }
  }

  useEffect(() => {
    channel.emit(Events.SELECT_FIXTURE, {
      sectionIdx: activeSectionIdx,
    });
  }, [activeSectionIdx]);

  useEffect(() => {
    channel.on(Events.INIT, initialise);

    return () => {
      channel.off(Events.INIT, initialise);
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

  if (entries.length === 1 && !fixtureSettings?.singleTab) {
    const [[, sectionVariants]] = entries;
    return (
      <PanelSection
        active
        fixtureContents={sectionVariants}
        selectedFixtureIdx={selectedVariantIdx}
        onSelect={handleVariantSelect}
      />
    );
  }

  return (
    <Tabs
      id="tabbed-fixture-sections"
      absolute
      bordered
      actions={{ onSelect: handleSectionChange }}
      selected={sectionNames[selectedSectionIdx]}
    >
      {entries.map(([k, v], idx) => {
        return (
          <div
            id={k}
            key={k}
            // @ts-ignore (title as render function. <div> is a placeholder here. The props are used to populate custom elements within Tabs)
            title={() => (
              <StyledTabButtonContent>
                <span className="tab-label">{k}</span>
                {entries.length > 1 && idx < 9 && (
                  <span className="tab-label-key">alt+{idx + 1}</span>
                )}
              </StyledTabButtonContent>
            )}
          >
            {({ active }: { active: boolean }) => {
              return (
                <PanelSection
                  key={k}
                  active={active}
                  fixtureContents={v}
                  sectionIdx={idx}
                  selectedFixtureIdx={selectedVariantIdx}
                  onSelect={handleVariantSelect}
                />
              );
            }}
          </div>
        );
      })}
    </Tabs>
  );
}

const StyledTabButtonContent = styled.span`
  .tab-label-key {
    display: inline-block;
    margin-left: 0.5rem;
    text-transform: uppercase;
    background-color: #0002;
    font-size: 9px;
    padding: 0.2rem 0.3rem;
    border-radius: 3px;
  }
`;
