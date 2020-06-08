/* global document */
import isPlainObject from 'lodash/isPlainObject';
import React, { useEffect, useState } from 'react';
import fetch from 'cross-fetch';
import { styled } from '@storybook/theming';
import addons from '@storybook/addons';
import { useStorybookApi } from '@storybook/api';
import { Tabs, TabWrapper } from '@storybook/components';
import { PREVIEW_KEYDOWN } from '@storybook/core-events';
import { FixtureParameters } from './types';
import { Events } from '.';

type FixtureData = {};

export function getEntries(obj = {}) {
  if (Array.isArray(obj)) {
    return obj.map((x, i) => [`Variant ${i + 1}`, x]);
  }
  if (isPlainObject(obj)) {
    return Object.entries(obj);
  }
  return [];
}

export async function fetchRemotes(
  fixtures: FixtureParameters
): Promise<FixtureParameters> {
  const entries = Object.entries(fixtures);
  const result = {};

  // eslint-disable-next-line no-restricted-syntax
  for await (const [key, variants] of entries) {
    result[key] = {};

    const variantEntries = Object.entries(variants);
    const isVariantsArray = Array.isArray(variants);
    // eslint-disable-next-line no-restricted-syntax
    for await (const [vKey, vVal] of variantEntries) {
      const variantKey = isVariantsArray ? `Variant ${Number(vKey) + 1}` : vKey;
      if (typeof vVal === 'string' && /^\.?\/|https?:\/\//.test(vVal)) {
        try {
          result[key][variantKey] = await fetch(vVal).then((r) => {
            if (!r.ok) {
              console.error(`Failed to fetch ${vVal}`);
            }
            return r.json();
          });
        } catch (err) {
          throw new Error(err);
        }
      } else {
        result[key][variantKey] = vVal;
      }
    }
  }

  return result;
}

const PanelSection = ({
  active,
  fixtureContents,
  sectionId,
  selectedSectionId,
  onSelect,
}) => {
  const entries = getEntries(fixtureContents);
  const [activeIdx, setActiveIdx] = useState(0);

  function activateVariant(idx) {
    setActiveIdx(idx);
    onSelect({
      sectionId,
      variantIdx: idx,
    });
  }

  function handlePreviewKeyDown({ event }) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key }) {
    let keyedIndex = key - 1;
    // Vim navigation: up/down to switch variants
    if (['k', 'j'].includes(key)) {
      keyedIndex = key === 'j' ? activeIdx + 1 : activeIdx - 1;
    }

    if (keyedIndex >= 0 && keyedIndex < entries.length && keyedIndex < 10) {
      activateVariant(keyedIndex);
    }
  }

  useEffect(() => {
    const channel = addons.getChannel();
    if (active) {
      channel.on(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (active) {
        channel.off(PREVIEW_KEYDOWN, handlePreviewKeyDown);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [sectionId, active, activeIdx]);

  useEffect(() => {
    // activate on tab switch
    if (active && sectionId === selectedSectionId) {
      activateVariant(activeIdx);
    }
  }, [selectedSectionId]);

  return (
    <TabWrapper
      active={active}
      render={() => (
        <FixturesMenu>
          {entries.map(([key, value], idx) => {
            const buttonClass = [activeIdx === idx && 'active'].filter(Boolean).join(' ');
            const previewText = JSON.stringify(value, null, 2).trim().slice(0, 300);
            const keyNumber = idx + 1;

            return (
              <FixtureButton
                key={key}
                type="button"
                className={buttonClass}
                title={
                  keyNumber < 10
                    ? `Press the ${keyNumber} key to select the variant (when focused in Preview)`
                    : undefined
                }
                data-id={key}
                onClick={() => activateVariant(idx)}
              >
                {keyNumber < 10 && <span className="key">{keyNumber}</span>}
                <span className="preview">{previewText}</span>
                <span className="name">{key}</span>
              </FixtureButton>
            );
          })}
        </FixturesMenu>
      )}
    />
  );
};

export default function Panel() {
  const channel = addons.getChannel();
  const [fixtures, setFixtures] = useState<FixtureData>({});
  const fixtureSections = Object.keys(fixtures);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const entries = getEntries(fixtures);
  const api = useStorybookApi();

  async function initialise(storyOptions) {
    try {
      const resolvedFixtures = await fetchRemotes(storyOptions);
      setFixtures(resolvedFixtures);
    } catch (err) {
      console.error('Some requests have failed.', err);
    }
  }

  function handleFixtureSelect({ sectionId, variantIdx }) {
    channel.emit(Events.CHANGE, { fixtures, sectionId, variantIdx });

    api.setQueryParams({
      fixture: sectionId,
      variant: variantIdx,
    });
  }

  function handleSectionSelect(id) {
    const idx = fixtureSections.findIndex((s) => s === id);
    setSelectedSectionIdx(idx);
  }

  function handlePreviewKeyDown({ event }) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key }) {
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

  return (
    <Tabs
      absolute
      bordered
      actions={{ onSelect: handleSectionSelect }}
      selected={fixtureSections[selectedSectionIdx]}
    >
      {entries.map(([k, v]) => (
        <div id={k} title={k} key={k}>
          {({ active }: { active: boolean }) => {
            const selectedId = active ? k : '';
            return (
              <PanelSection
                key={k}
                active={active}
                fixtureContents={v}
                sectionId={k}
                selectedSectionId={selectedId}
                onSelect={handleFixtureSelect}
              />
            );
          }}
        </div>
      ))}
    </Tabs>
  );
}

const FixturesMenu = styled.menu`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: minmax(3rem, 8rem);
  grid-gap: 0.5rem;
  padding: 0.5rem;
  margin: 0;
`;

const FixtureButton = styled.button`
  background: ${({ theme }) => theme.background.hoverable};
  border: 2px solid transparent;
  border-radius: 0.3rem;
  padding: 0.2rem;
  transition: 100ms border-color;
  font-size: 0.8rem;
  display: block;
  position: relative;
  text-align: left;
  box-shadow: 0 1px 2px #0005;
  color: ${({ theme }) => theme.color.defaultText};

  &:hover {
    filter: brightness(80%);
  }

  &:active {
    background-color: ${({ theme }) => theme.barBg};
  }

  &.active {
    border-color: ${({ theme }) => theme.color.secondary};
  }

  .key {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    z-index: 1;
    border-radius: 0.2rem;
    background-color: #0002;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.4rem;
    height: 1.4rem;
    font-size: 0.7rem;
    font-weight: 600;
  }

  .preview {
    border-radius: 0.2rem;
    padding: 0.2rem 1.4rem 0.2rem 0.2rem;
    font-size: 0.6rem;
    background: #0001;
    overflow: hidden;
    white-space: pre-wrap;
    mask-image: linear-gradient(to bottom, #000a, transparent);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 1rem;
    left: 0;
  }

  .name {
    position: absolute;
    font-weight: 600;
    bottom: 0.2rem;
    left: 0.2rem;
    padding: 0.2rem;
    text-shadow: 0 1px 1px #0004;
  }
`;
