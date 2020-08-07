import { isEmpty } from 'lodash';
import { Fixture, Variant } from './types';

interface IFixtureState {
  selectedVariants: number[];
  selectedSectionIdx: number;
}

export default class VariantSelector {
  activeVariant: object | undefined;

  selectedVariants: Variant[];

  fixtures: object;

  settings: object;

  defaultSettings: object;

  static toQuery({
    selectedSectionIdx = 0,
    selectedVariants = [],
  }: IFixtureState): string {
    const variantsQuery = selectedVariants.join(',');
    return `${variantsQuery}:${selectedSectionIdx}`;
  }

  static fromQuery(queryStr = ''): IFixtureState {
    const [fixturesStr = '', sectionIdxStr] = queryStr.split(':');
    return {
      selectedSectionIdx: parseInt(sectionIdxStr, 10),
      selectedVariants: fixturesStr ? fixturesStr.split(',').map(Number) : [],
    };
  }

  constructor() {
    this.activeVariant = undefined;
    this.selectedVariants = [];
    this.fixtures = {};
    this.settings = {};

    this.onChange = this.onChange.bind(this);
  }

  processInput(fixtures) {
    let hasCustomSettings = false;
    const defaultSettings = {
      singleTab: false,
    };

    this.fixtures = Object.entries(fixtures).reduceRight((acc, [k, v]) => {
      if (k.startsWith('__')) {
        hasCustomSettings = true;
        const settingsKey = k.replace('__', '');
        this.settings[settingsKey] = v;
        return acc;
      }
      if (isEmpty(v)) return acc;
      return {
        [k]: v,
        ...acc,
      };
    }, {});

    if (!hasCustomSettings) {
      this.settings = defaultSettings;
    }

    this.setDefaults();
  }

  setDefaults() {
    const hasFixtures = Boolean(Object.keys(this.fixtures).length);
    if (!hasFixtures) return;

    // set to the first item of each section
    this.selectedVariants = Object.values(this.fixtures).map(
      (section: Fixture) => Object.values(section)[0]
    );
    [this.activeVariant] = this.selectedVariants;
  }

  applyQuery(query?: string): void {
    if (!query) {
      return;
    }
    const [variantsString, activeSectionIdx = 0] = query.split(':');
    const fixtureVariants = variantsString.split(',').map(Number);
    const entries = Object.entries(this.fixtures);
    const variantsFromQuery = entries.reduce((acc, [sectionKey, sectionValue], idx) => {
      const variantEntries = Object.entries(sectionValue);
      const variantIdx = fixtureVariants[idx] || 0;
      const [, variant] = variantEntries[Number(variantIdx)];
      return {
        ...acc,
        [sectionKey]: variant,
      };
    }, {});

    this.selectedVariants = Object.values(variantsFromQuery);
    this.activeVariant = this.selectedVariants[activeSectionIdx];
  }

  onChange({ selectedSectionIdx, selectedVariants }) {
    const variantsQuery = selectedVariants.join(',');
    this.applyQuery(`${variantsQuery}:${selectedSectionIdx}`);
  }
}
