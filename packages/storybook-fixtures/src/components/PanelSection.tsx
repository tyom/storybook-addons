/* global document */
import React, { useEffect, useState } from 'react';
import { styled } from '@storybook/theming';
import addons from '@storybook/addons';
import { PREVIEW_KEYDOWN } from '@storybook/core-events';
import { TabWrapper } from '@storybook/components';
import { KeyboardEvent, PreviewKeyDownEvent } from '../types';
import { getEntries } from './Panel';

interface IPanelSectionProps {
  active: boolean;
  fixtureContents: {};
  sectionIdx?: number;
  selectedFixtureIdx: number;
  onSelect: Function;
}

export default function PanelSection({
  active,
  fixtureContents,
  sectionIdx = 0,
  selectedFixtureIdx,
  onSelect,
}: IPanelSectionProps) {
  const entries = getEntries(fixtureContents);
  const [activeIdx, setActiveIdx] = useState(selectedFixtureIdx);

  function handlePreviewKeyDown({ event }: PreviewKeyDownEvent) {
    handleKeyDown(event);
  }

  function handleKeyDown({ key }: KeyboardEvent) {
    let keyedIndex = Number(key) - 1;
    // Vim-style navigation: up/down to switch variants
    if (['k', 'j'].includes(key)) {
      keyedIndex = key === 'k' ? activeIdx + 1 : activeIdx - 1;
    }
    if (keyedIndex >= 0 && keyedIndex < entries.length && keyedIndex < 10) {
      setActiveIdx(keyedIndex);
    }
  }

  useEffect(() => {
    const channel = addons.getChannel();

    if (active) {
      channel.on(PREVIEW_KEYDOWN, handlePreviewKeyDown);
      document.addEventListener('keydown', handleKeyDown);

      onSelect({
        sectionIdx,
        variantIdx: activeIdx,
      });
    }

    return () => {
      if (active) {
        channel.off(PREVIEW_KEYDOWN, handlePreviewKeyDown);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [active, activeIdx]);

  return (
    <TabWrapper
      active={active}
      render={() => (
        <FixturesMenu>
          {entries.map(([key, value], idx) => {
            const buttonClass = [selectedFixtureIdx === idx && 'active']
              .filter(Boolean)
              .join(' ');
            const previewText = JSON.stringify(value, null, 2);
            const previewTextTrimmed = previewText
              ? previewText.trim().slice(0, 300)
              : previewText;
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
                onClick={() => setActiveIdx(idx)}
              >
                {keyNumber < 10 && <span className="key">{keyNumber}</span>}
                <span className="preview">{previewTextTrimmed}</span>
                <span className="name">{key}</span>
              </FixtureButton>
            );
          })}
        </FixturesMenu>
      )}
    />
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
  font-size: 0.65rem;
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
    background: #0001;
    overflow: hidden;
    white-space: pre-wrap;
    line-height: 1.2;
    mask-image: linear-gradient(to bottom, #000a, transparent);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0.5rem;
    left: 0;
  }

  .name {
    font-size: 1.5em;
    position: absolute;
    font-weight: 600;
    bottom: 0.2rem;
    left: 0.2rem;
    padding: 0.2rem;
  }
`;
