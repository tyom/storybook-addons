import React from 'react';
import addons, { mockChannel } from '@storybook/addons';
import { getEntries } from './Panel';

addons.setChannel(mockChannel());

const mockLocalData = {
  UK: {
    name: 'United Kingdom',
    population: 67_886_011,
    density: 36,
  },
  US: {
    name: 'United States',
    population: 331_002_651,
    density: 281,
  },
};

const mockCollection = [mockLocalData.UK, mockLocalData.US];

describe('#getEntries', () => {
  test('returns empty array when the input is invalid', () => {
    expect(getEntries()).toEqual([]);
    expect(getEntries('string')).toEqual([]);
    expect(getEntries(true)).toEqual([]);
    expect(getEntries(null)).toEqual([]);
  });

  test('returns entries array with generated keys for a collection', () => {
    const entries = getEntries(mockCollection);

    expect(entries).toEqual([
      ['Variant 1', { density: 36, name: 'United Kingdom', population: 67886011 }],
      ['Variant 2', { density: 281, name: 'United States', population: 331002651 }],
    ]);
  });

  test('returns entries array for object', () => {
    const entries = getEntries(mockLocalData);

    expect(entries).toEqual([
      ['UK', { density: 36, name: 'United Kingdom', population: 67886011 }],
      ['US', { density: 281, name: 'United States', population: 331002651 }],
    ]);
  });
});
