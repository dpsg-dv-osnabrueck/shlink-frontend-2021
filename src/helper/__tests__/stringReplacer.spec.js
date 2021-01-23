import stringReplacer from '@/helper/stringReplacer';
import errorMessages from '@/data/errorMessages';

describe('Helper: stringReplacer', () => {
  const regex = new RegExp(/\$([^$]*)\$/gm);
  const emptyString = '';
  const stringNoPlaceholder = 'No placeholder';

  test('Single value', () => {
    const string = 'Single $VALUE$';
    const value = 'value';

    expect(() => {
      stringReplacer(string);
    }).toThrowError(new Error(errorMessages.STRING_REPLACER.NO_VALUE));

    expect(() => {
      stringReplacer(stringNoPlaceholder, value);
    }).toThrowError(new Error(errorMessages.STRING_REPLACER.NO_PLACEHOLDER));

    expect(() => {
      stringReplacer(emptyString, value);
    }).toThrowError(new Error(errorMessages.STRING_REPLACER.NO_STRING));

    expect(stringReplacer(string, value)).toBeDefined();

    expect(stringReplacer(string, value)).not.toMatch(regex);
  });

  test('Multiple values', () => {
    const string = 'Multiple $VALUE1$ $VALUE2$';
    const values = ['value1', 'value2'];

    expect(() => {
      stringReplacer(string);
    }).toThrowError(new Error(errorMessages.STRING_REPLACER.NO_VALUE));

    expect(() => {
      stringReplacer(stringNoPlaceholder, values);
    }).toThrowError(new Error(errorMessages.STRING_REPLACER.NO_PLACEHOLDER));

    expect(() => {
      stringReplacer(emptyString, values);
    }).toThrowError(new Error(errorMessages.STRING_REPLACER.NO_STRING));

    expect(stringReplacer(string, values)).toBeDefined();

    expect(stringReplacer(string, values)).not.toMatch(regex);
  });
});
