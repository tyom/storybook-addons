import fetchMock from 'cross-fetch';
import { fetchRemotes } from './remotes';

// eslint-disable-next-line global-require
jest.mock('cross-fetch', () => require('fetch-mock-jest').sandbox());

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
