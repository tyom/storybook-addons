import { optionsKnob, select } from '@storybook/addon-knobs';

interface IFixtureOptions {
  valuesObj: object;
  fixtureObj: object;
}

export interface IFieldOptions {
  type: 'radio' | 'inline-radio' | 'select';
  initial?: string;
}

const INPUT_TYPES = ['radio', 'inline-radio', 'select'];

/**
 * Create radio buttons from fixture data, mapping radio buttons to fixture data items
 */
function getOptionsFromFixture(
  fixture: object,
  optionLabelKey = (val: string) =>
    Object.entries(val).filter(([, v]) => typeof v === 'string')[0][1]
): IFixtureOptions {
  if (!fixture) {
    throw new Error('Fixture is required');
  }
  const optionsArray = Array.isArray(fixture)
    ? fixture.map((x, i) => [`option-${i + 1}`, x])
    : Object.entries(fixture);

  const valuesObj = optionsArray.reduce((acc, [key, value], idx) => {
    const label =
      typeof optionLabelKey === 'function'
        ? optionLabelKey(value)
        : value[optionLabelKey] || `${idx + 1}: ${optionLabelKey} not found`;

    return {
      ...acc,
      [label]: key,
    };
  }, {});

  const fixtureObj = optionsArray.reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return {
    valuesObj,
    fixtureObj,
  };
}

/**
 * Get fixture item from selected input
 */
export function getSelectedFixture(
  fixtureDefinition,
  selectAddon,
  optionLabelKey
) {
  const { valuesObj, fixtureObj } = getOptionsFromFixture(
    fixtureDefinition,
    optionLabelKey
  );
  const values = Object.values(valuesObj);
  const initialKey = values.length && values[0];
  const selection = selectAddon(valuesObj, initialKey);

  return fixtureObj[selection];
}

/**
 * High-order function to create a new select input
 */
export function createFixtureInput(fixture: {} | [], optionLabelKey?: string) {
  return function createInput(fieldLabel: string, options?: IFieldOptions) {
    const { type = 'select', initial } = options || {};

    if (!fieldLabel) {
      throw new Error('Field label is required');
    }
    if (!INPUT_TYPES.includes(type)) {
      throw new Error(
        `'${type}' is not a valid input type. Valid types: ${INPUT_TYPES.join(
          ', '
        )}.`
      );
    }

    return getSelectedFixture(
      fixture,
      (valuesObj, initialKey) => {
        const selectedInput = initial || initialKey;

        switch (type) {
          case INPUT_TYPES[0]:
            return optionsKnob(fieldLabel, valuesObj, selectedInput, {
              display: 'radio',
            });
          case INPUT_TYPES[1]:
            return optionsKnob(fieldLabel, valuesObj, selectedInput, {
              display: 'inline-radio',
            });
          default:
            return select(fieldLabel, valuesObj, selectedInput);
        }
      },
      optionLabelKey
    );
  };
}
