import React from 'react';
import fetchMock from 'cross-fetch';
import addons, { mockChannel } from '@storybook/addons';
import { getEntries, fetchRemotes } from './Panel';

// eslint-disable-next-line global-require
jest.mock('cross-fetch', () => require('fetch-mock-jest').sandbox());

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

const mockRemoteData = {
  China: {
    name: 'China',
    population: 1_439_323_776,
    density: 153,
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

describe('#fetchRemotes', () => {
  test('parses the static fixture and fetches any URLs (top-level string values)', async () => {
    fetchMock.get('https://example.com/data.json', mockRemoteData.China);

    const mockDataWithUrls = {
      localData: mockLocalData,
      remoteData: {
        China: 'https://example.com/data.json',
      },
    };

    const populatedData = await fetchRemotes(mockDataWithUrls);
    expect(fetchMock).toHaveFetched('https://example.com/data.json', 'get');
    expect(populatedData).toEqual({
      localData: mockLocalData,
      remoteData: mockRemoteData,
    });
  });
});
