import caching from '@/store/settings/caching';
import errorMessages from '@/data/errorMessages';

/**
 * @module cachingHelper
 */

/**
 *
 * Take state and saves only items to local storage that are specified
 *
 * @param {Object} state
 * @param {array} [items=caching] Default values can be found in src/store/settings/caching.js
 * @returns {Object} Only values, that are specified in items array
 * @example cachingHelper.write({key: 'value'})
 * @author Dominik Niemann <dominik@polargold.de>
 *
 */
const write = (state, items = caching) => {
  if (!state) throw new Error(errorMessages.CACHING_HELPER.NO_VALUE);

  const localState = {};

  Object.keys(state).forEach((stateKey) => {
    const stateItem = state[stateKey];

    if (items.includes(stateKey)) {
      localState[stateKey] = stateItem;
    }

    Object.keys(stateItem).forEach((subKey) => {
      const subItem = stateItem[subKey];

      if (items.includes(subKey)) {
        if (!localState[stateKey]) {
          localState[stateKey] = {};
        }

        localState[stateKey][subKey] = subItem;
      }
    });
  });

  return localState;
};

/**
 *
 * Retrieve state values, that are saved in local storage
 *
 * @param {Object} state
 * @param {Object} cachedState
 * @param {array} [items=caching] Default values van be found in src/store/settings/caching.js
 * @returns {Object} Combined state which includes cached values
 * @example cachingHelper.read({key: 'oldValue'}, {key: 'newValue'})
 * @author Dominik Niemann <dominik@polargold.de>
 *
 */
const read = (state, cachedState, items = caching) => {
  const newState = { ...state };

  Object.keys(state).forEach((stateKey) => {
    if (items.includes(stateKey)) {
      newState[stateKey] = cachedState[stateKey];
    }

    Object.keys(state[stateKey]).forEach((subKey) => {
      if (items.includes(subKey)) {
        newState[stateKey][subKey] = cachedState[stateKey][subKey];
      }
    });
  });

  return newState;
};

export default {
  write,
  read,
};
