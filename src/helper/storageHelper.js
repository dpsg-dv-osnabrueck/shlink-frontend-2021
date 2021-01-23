import errorMessages from '@/data/errorMessages';

/**
 * @module storageHelper
 */

/**
 *
 * Save values to local storage
 *
 * @param {*} value
 * @param {string} key
 * @example storageHelper.write('Some value', 'someKey')
 * @author Dominik Niemann <dominik@polargold.de>
 */
const write = (value, key) => {
  if (!value) {
    throw new Error(errorMessages.LOCAL_STORAGE.NO_VALUE);
  }

  if (!key) {
    throw new Error(errorMessages.LOCAL_STORAGE.NO_KEY);
  }

  localStorage.setItem(key, JSON.stringify(value));
};

/**
 *
 * Retrieve values from local storage
 *
 * @param {string} key
 * @example storageHelper.read('someKey')
 * @returns {Object | string} If nothing is found, an empty string will be returned
 * @author Dominik Niemann <dominik@polargold.de>
 */
const read = (key) => {
  if (!key) {
    throw new Error(errorMessages.LOCAL_STORAGE.NO_KEY);
  }

  const storage = localStorage.getItem(key);
  return storage ? JSON.parse(storage) : '';
};

/**
 *
 * Delete specific item from local storage
 *
 * @param {string} key
 * @example storageHelper.remove('someKey')
 * @author Dominik Niemann <dominik@polargold.de>
 */
const remove = (key) => {
  if (!key) {
    throw new Error(errorMessages.LOCAL_STORAGE.NO_KEY);
  }

  localStorage.removeItem(key);
};

/**
 *
 * Clear whole local storage
 * @example storageHelper.clear()
 * @author Dominik Niemann <dominik@polargold.de>
 */
const clear = () => {
  localStorage.clear();
};

export default {
  write,
  read,
  remove,
  clear,
};
