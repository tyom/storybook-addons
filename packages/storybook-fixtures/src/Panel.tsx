import isPlainObject from 'lodash/isPlainObject';
import React, { useEffect, useState } from 'react';
import fetch from 'cross-fetch';
import { styled } from '@storybook/theming';
import addons from '@storybook/addons';
import { useStorybookApi } from '@storybook/api';
import { TabsState, TabWrapper } from '@storybook/components';
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
      if (typeof vVal === 'string') {
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
  box-shadow: 0 1px #0003;
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

  .preview {
    border-radius: 0.2rem;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 0.6rem;
    background: #0001;
    overflow: hidden;
    white-space: pre;
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
  }
`;

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
    const [, variant] = entries[idx];
    setActiveIdx(idx);
    onSelect({
      sectionId,
      variant,
      variantIdx: idx,
    });
  }

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
            return (
              <FixtureButton
                key={key}
                type="button"
                className={buttonClass}
                data-id={key}
                onClick={() => activateVariant(idx)}
              >
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

function Panel() {
  const channel = addons.getChannel();
  const [fixtures, setFixtures] = useState<FixtureData>();
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

  useEffect(() => {
    channel.on(Events.INIT, initialise);

    return () => {
      channel.off(Events.INIT, initialise);
    };
  }, []);

  if (!entries.length) {
    return null;
  }

  return (
    <TabsState absolute>
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
    </TabsState>
  );
}

export default Panel;
