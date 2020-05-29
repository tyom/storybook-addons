import { optionsKnob, select } from '@storybook/addon-knobs';
import { getSelectedFixture, createFixtureInput } from './fixtures';

jest.mock('@storybook/addon-knobs');

const mockFixtureCollection = [
  {
    name: 'Adam',
    occupation: 'Architect',
    age: 36,
  },
  {
    name: 'Victor',
    occupation: 'Plumber',
    age: 43,
  },
];

const mockFixtureObj = {
  First: mockFixtureCollection[0],
  Second: mockFixtureCollection[1],
};

test('requires fixture object as argument', () => {
  expect(() => getSelectedFixture()).toThrow('Fixture is required');
});

describe('#getSelectedFixture', () => {
  test('uses the first string property value as option label and fixture property name as option value, defaults to first option', () => {
    const selectAddon = jest.fn(() => 'first');
    const selectedFixture = getSelectedFixture(mockFixtureObj, selectAddon);

    expect(selectAddon).toHaveBeenCalledWith(
      {
        First: 'First',
        Second: 'Second',
      },
      'First'
    );

    expect(selectedFixture).toEqual(mockFixtureObj.first);
  });

  test('use custom property key for option label', () => {
    const selectAddon = jest.fn();
    getSelectedFixture(mockFixtureObj, selectAddon, 'occupation');

    expect(selectAddon).toHaveBeenCalledWith(
      {
        Architect: 'First',
        Plumber: 'Second',
      },
      'First'
    );
  });

  test('use error-like message as option label for optionLabelKey that is not found', () => {
    const selectAddon = jest.fn();
    getSelectedFixture(mockFixtureObj, selectAddon, 'address');

    expect(selectAddon).toHaveBeenCalledWith(
      {
        '1: address not found': 'First',
        '2: address not found': 'Second',
      },
      'First'
    );
  });

  test('create option label from fixture object using callback', () => {
    const selectAddon = jest.fn();
    getSelectedFixture(
      mockFixtureObj,
      selectAddon,
      (f) => `${f.name} - ${f.age}`
    );

    expect(selectAddon).toHaveBeenCalledWith(
      {
        'Adam - 36': 'First',
        'Victor - 43': 'Second',
      },
      'First'
    );
  });

  test('with collection as fixture', () => {
    const selectAddon = jest.fn();
    getSelectedFixture(mockFixtureCollection, selectAddon);

    expect(selectAddon).toHaveBeenCalledWith(
      {
        'Variant 1': 'Variant 1',
        'Variant 2': 'Variant 2',
      },
      'Variant 1'
    );
  });
});

describe('#createFixtureInput', () => {
  test('get input creator function', () => {
    const inputCreator = createFixtureInput(mockFixtureCollection);

    expect(inputCreator).toStrictEqual(expect.any(Function));
  });

  describe('input creator', () => {
    test('throws an error when field label is omitted', () => {
      const inputCreator = createFixtureInput(mockFixtureCollection);

      expect(() => inputCreator()).toThrow('Field label is required');
    });

    test('throws an error when an invalid input type is given', () => {
      const inputCreator = createFixtureInput(mockFixtureCollection);

      expect(() =>
        inputCreator('Select:', {
          type: 'carousel',
        })
      ).toThrow(
        `'carousel' is not a valid input type. Valid types: radio, inline-radio, select.`
      );
    });

    test('use defaults', () => {
      const inputCreator = createFixtureInput(mockFixtureCollection);
      inputCreator('Select:');

      expect(select).toHaveBeenCalledWith(
        'Select:',
        {
          'Variant 1': 'Variant 1',
          'Variant 2': 'Variant 2',
        },
        'Variant 1'
      );
    });

    test('initial selection', () => {
      const inputCreator = createFixtureInput(mockFixtureCollection);
      inputCreator('Select:', {
        initial: 'Variant 2',
      });

      expect(select).toHaveBeenCalledWith(
        'Select:',
        {
          'Variant 1': 'Variant 1',
          'Variant 2': 'Variant 2',
        },
        'Variant 2'
      );
    });

    test('use radios', () => {
      const inputCreator = createFixtureInput(mockFixtureCollection);
      inputCreator('Select:', {
        type: 'radio',
      });

      expect(optionsKnob).toHaveBeenCalledWith(
        'Select:',
        {
          'Variant 1': 'Variant 1',
          'Variant 2': 'Variant 2',
        },
        'Variant 1',
        { display: 'radio' }
      );
    });

    test('use inline radios', () => {
      const inputCreator = createFixtureInput(mockFixtureCollection);
      inputCreator('Select:', {
        type: 'inline-radio',
      });

      expect(optionsKnob).toHaveBeenCalledWith(
        'Select:',
        {
          'Variant 1': 'Variant 1',
          'Variant 2': 'Variant 2',
        },
        'Variant 1',
        { display: 'inline-radio' }
      );
    });
  });
});
