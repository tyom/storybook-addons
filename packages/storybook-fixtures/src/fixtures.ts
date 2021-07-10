import { isEmpty } from 'lodash';
import { SelectionQuery, FixtureSections } from './types';

interface IFixtureState {
  selectedVariantIdxs: number[];
  selectedSectionIdx: number;
  selectedSectionVariantIdx: number;
}

interface ILocalState {
  [id: string]: {
    query: SelectionQuery;
  };
}

interface IStoryFixtureState {
  fixtures: FixtureSections;
  storyId: string;
  localState: ILocalState;
  urlQuery?: string;
}

const QUERY_VARIANT_DELIM = '-';
const QUERY_SECTION_DELIM = '.';

/**
 * Stringify story fixtures state for use in query string or local storage
 * @param selectedVariantIdxs - indexes of selected variants for each section, e.g. [0, 1]
 * @param selectedSectionIdx - index of the active section, e.g. 1
 */
export function stringifyStoryState(
  selectedVariantIdxs: number[] = [],
  selectedSectionIdx = 0
): string {
  const variantsQuery = selectedVariantIdxs.join(QUERY_VARIANT_DELIM);
  return [variantsQuery, selectedSectionIdx].join(QUERY_SECTION_DELIM);
}

/**
 * Parse the story fixtures state
 * @param stateStr - string encoding selected fixture variants for a story, e.g. 0-1.2
 *  where the first part, delimited by . is the index of variant of each section (tab)
 */
export function parseStoryState(stateStr = ''): IFixtureState {
  const [fixturesStr, sectionIdxStr] = stateStr.split(QUERY_SECTION_DELIM);
  const selectedSectionIdx = parseInt(sectionIdxStr, 10) || 0;
  const selectedVariantIdxs = fixturesStr
    ? fixturesStr.split(QUERY_VARIANT_DELIM).map(Number)
    : [];
  return {
    selectedSectionIdx,
    selectedVariantIdxs,
    selectedSectionVariantIdx: selectedVariantIdxs[selectedSectionIdx],
  };
}

export function getStoryFixturesState({
  fixtures,
  storyId,
  localState,
  urlQuery,
}: IStoryFixtureState) {
  const { query: localStorageQuery } = localState[storyId] || {};
  const { selectedVariantIdxs, selectedSectionIdx } = parseStoryState(
    localStorageQuery || urlQuery
  );
  const sections = Object.values(fixtures);

  const selectedVariants = sections.reduce((acc, curr, idx) => {
    const sectionVariants = Object.values(curr);
    const variantIdx = selectedVariantIdxs[idx] || 0;
    const variant = sectionVariants[variantIdx];
    acc.push(variant);
    return acc;
  }, []);

  return {
    selectedVariants,
    activeVariant: selectedVariants[selectedSectionIdx],
    selectedVariantIdxs,
  };
}

export function processInput(fixtures = {}) {
  const settings = {
    singleTab: false,
  };
  return {
    fixtures: Object.entries(fixtures).reduceRight((acc, [k, v]) => {
      if (k.startsWith('__')) {
        const settingsKey = k.replace('__', '');
        settings[settingsKey] = v;
        return acc;
      }
      if (isEmpty(v)) return acc;
      return {
        [k]: v,
        ...acc,
      };
    }, {}),
    settings,
  };
}
