import { isArray } from 'lodash';
import errorMessages from '@/data/errorMessages';

/**
 *
 * Replace placeholder within a string with specified values
 *
 * This functions searches for placeholder which are wrapped between two $ signs.
 * By default, just one placeholder will me replaced with a given value. If
 * multiple values are provided as an array, the values will replace the placeholder
 * in order of the array.
 *
 * @param {!string} string  - Must contain a placeholder
 * @param {!string | Array} value - Value that will replace the placeholder.
 * @returns {string} String with all placeholder replaced
 * @example stringReplacer('I bought $AMOUNT$ eggs', 5)
 * // Output: 'I bought 5 eggs'
 * @example stringReplacer('I bought $AMOUNT1$ eggs and $AMOUNT2$ apples', [5,2])
 * // Output: 'I bought 5 eggs and 2 apples'
 * @author Dominik Niemann <dominik@polargold.de>
 *
 */
const stringReplacer = (string, value) => {
  if (!value) throw new Error(errorMessages.STRING_REPLACER.NO_VALUE);
  if (!string) throw new Error(errorMessages.STRING_REPLACER.NO_STRING);

  let sentence = string;
  const regex = new RegExp(/\$([^$]*)\$/gm);
  const matches = string.match(regex);

  if (!matches) throw new Error(errorMessages.STRING_REPLACER.NO_PLACEHOLDER);

  if (isArray(value)) {
    value.forEach((element, index) => {
      sentence = sentence.replace(matches[index], element);
    });
  } else {
    sentence = sentence.replace(regex, value);
  }

  return sentence;
};

export default stringReplacer;
