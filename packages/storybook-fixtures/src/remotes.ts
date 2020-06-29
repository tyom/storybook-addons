import fetch from 'cross-fetch';
import { FixtureParameters } from './types';

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
              // eslint-disable-next-line no-console
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