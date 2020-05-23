import fetch from 'cross-fetch';
import { useEffect, useState } from 'react';
import { createFixtureInput } from './fixtures';

export const getRemoteFixture = async (url) =>
  fetch(url).then((res) => res.json());

export function useRemoteFixture(url: string) {
  const [value, setValue] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getRemoteFixture(url).then((x) => {
      setValue(x);
      setLoaded(true);
    });
  }, [url]);

  return loaded ? createFixtureInput(value) : () => {};
}
