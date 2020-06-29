/* global document */
import isPlainObject from 'lodash/isPlainObject';
import React, { useEffect, useState } from 'react';
import addons from '@storybook/addons';
import { useStorybookApi } from '@storybook/api';
import { Tabs } from '@storybook/components';
import { PREVIEW_KEYDOWN } from '@storybook/core-events';
import { fetchRemotes } from '../remotes';
import { renderPanelSection } from './PanelSection';
import { KeyboardEvent, PreviewKeyDownEvent } from '../types';
import { Events } from '..';

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
  const channel = addons.getChannel();
  const [fixtures, setFixtures] = useState<FixtureData>({});
  const [fixtureSettings, setFixtureSettings] = useState<IFixtureSettings>({});
  const [fixtureSelection, setFixtureSelection] = useState<number[]>([]);
  const fixtureSections = Object.keys(fixtures);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const entries = getEntries(fixtures);
  const api = useStorybookApi();

  async function initialise(storyOptions, settings) {
    try {
      const resolvedFixtures = await fetchRemotes(storyOptions);
      setFixtures(resolvedFixtures);
      setFixtureSettings(settings);
      setFixtureSelection([]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Some requests have failed.', err);
    }
  }

  function handleFixtureSelect({ sectionId, variantIdx }) {
    channel.emit(Events.CHANGE, { fixtures, sectionId, variantIdx });

    const sectionIdx = Object.keys(fixtures).findIndex((x) => x === sectionId);
    const newSelection: number[] = [...fixtureSelection];
    newSelection[sectionIdx] = variantIdx;
    setFixtureSelection(newSelection);

    api.setQueryParams({
      fixtures: `${newSelection.join(',')}:${sectionIdx}`,
    });
  }

  function handleSectionSelect(id: string) {
    const idx = fixtureSections.findIndex((s) => s === id);
    setSelectedSectionIdx(idx);
  }

  function handlePreviewKeyDown({ event }: PreviewKeyDownEvent) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key }: KeyboardEvent) {
    // Vim navigation: left/right to switch section tabs
    // Switch to right
    if (key === 'l' && selectedSectionIdx < fixtureSections.length - 1) {
      setSelectedSectionIdx(selectedSectionIdx + 1);
    }
    // Switch to left
    if (key === 'h' && selectedSectionIdx > 0) {
      setSelectedSectionIdx(selectedSectionIdx - 1);
    }
  }

  useEffect(() => {
    channel.on(Events.INIT, initialise);

    if (fixtureSections.length) {
      setSelectedSectionIdx(selectedSectionIdx);
      channel.on(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      channel.off(Events.INIT, initialise);

      if (fixtureSections.length) {
        document.removeEventListener('keydown', handleKeyDown);
        channel.off(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      }
    };
  }, [JSON.stringify(fixtureSections), selectedSectionIdx]);

  if (!entries.length) {
    return null;
  }

  if (entries.length === 1 && !fixtureSettings?.singleTab) {
    const [[key, value]] = entries;
    return renderPanelSection({
      id: key,
      content: value,
      active: true,
      onSelect: handleFixtureSelect,
    });
  }

  return (
    <Tabs
      id="tabbed-fixture-sections"
      absolute
      bordered
      actions={{ onSelect: handleSectionSelect }}
      selected={fixtureSections[selectedSectionIdx]}
    >
      {entries.map(([k, v]) => (
        <div id={k} title={k} key={k}>
          {({ active }: { active: boolean }) =>
            renderPanelSection({
              id: k,
              content: v,
              active,
              onSelect: handleFixtureSelect,
            })
          }
        </div>
      ))}
    </Tabs>
  );
}
