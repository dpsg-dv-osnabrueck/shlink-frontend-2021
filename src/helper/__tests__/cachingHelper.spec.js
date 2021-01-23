import errorMessages from '@/data/errorMessages';
import cachingHelper from '@/helper/cachingHelper';

describe('Helper: cachingHelper write', () => {
  const state = {
    FirstLevelKey1: {
      SecondLevelLey11: {
        SecondLevelValue11: 'value',
      },
      SecondLevelKey12: {
        SecondLevelValue12: 'value',
      },
    },
    FirstLevelKey2: {
      SecondLevelLey21: {
        SecondLevelValue21: 'value',
      },
      SecondLevelKey22: {
        SecondLevelValue22: 'value',
      },
    },
  };

  const targetStateLevel1 = {
    FirstLevelKey1: {
      SecondLevelLey11: {
        SecondLevelValue11: 'value',
      },
      SecondLevelKey12: {
        SecondLevelValue12: 'value',
      },
    },
  };

  const targetStateLevel2 = {
    FirstLevelKey2: {
      SecondLevelKey22: {
        SecondLevelValue22: 'value',
      },
    },
  };

  const targetStateMixedLevel = {
    FirstLevelKey1: {
      SecondLevelLey11: {
        SecondLevelValue11: 'value',
      },
      SecondLevelKey12: {
        SecondLevelValue12: 'value',
      },
    },
    FirstLevelKey2: {
      SecondLevelKey22: {
        SecondLevelValue22: 'value',
      },
    },
  };

  const cachingLevel1 = ['FirstLevelKey1'];
  const cachingLevel2 = ['SecondLevelKey22'];
  const cachingMixedLevel = ['FirstLevelKey1', 'SecondLevelKey22'];

  test('No value', () => {
    expect(() => {
      cachingHelper.write(null, targetStateLevel1);
    }).toThrowError(new Error(errorMessages.CACHING_HELPER.NO_VALUE));
  });

  test('1st level', () => {
    expect(cachingHelper.write(state, cachingLevel1)).toBeDefined();
    expect(cachingHelper.write(state, cachingLevel1)).toEqual(targetStateLevel1);
    expect(cachingHelper.write(state, cachingLevel1)).not.toEqual(state);
  });

  test('2nd level', () => {
    expect(cachingHelper.write(state, cachingLevel2)).toBeDefined();
    expect(cachingHelper.write(state, cachingLevel2)).toEqual(targetStateLevel2);
    expect(cachingHelper.write(state, cachingLevel2)).not.toEqual(state);
  });

  test('1st & 2nd level', () => {
    expect(cachingHelper.write(state, cachingMixedLevel)).toBeDefined();
    expect(cachingHelper.write(state, cachingMixedLevel)).toEqual(targetStateMixedLevel);
    expect(cachingHelper.write(state, cachingMixedLevel)).not.toEqual(state);
  });
});

describe('Helper: cachingHelper read', () => {
  const state = {
    FirstLevelKey1: {
      SecondLevelLey11: {
        SecondLevelValue11: 'value',
      },
      SecondLevelKey12: {
        SecondLevelValue12: 'value',
      },
    },
    FirstLevelKey2: {
      SecondLevelLey21: {
        SecondLevelValue21: 'value',
      },
      SecondLevelKey22: {
        SecondLevelValue22: 'value',
      },
    },
  };

  const cachedState = {
    FirstLevelKey1: {
      SecondLevelLey11: {
        SecondLevelValue11: 'updatedValue11',
      },
      SecondLevelKey12: {
        SecondLevelValue12: 'updatedValue12',
      },
    },
  };

  const newState = {
    FirstLevelKey1: {
      SecondLevelLey11: {
        SecondLevelValue11: 'updatedValue11',
      },
      SecondLevelKey12: {
        SecondLevelValue12: 'updatedValue12',
      },
    },
    FirstLevelKey2: {
      SecondLevelLey21: {
        SecondLevelValue21: 'value',
      },
      SecondLevelKey22: {
        SecondLevelValue22: 'value',
      },
    },
  };

  const cache = ['FirstLevelKey1'];

  test('Read', () => {
    expect(cachingHelper.read(state, cachedState, cache)).toBeDefined();
    expect(cachingHelper.read(state, cachedState, cache)).toEqual(newState);
    expect(cachingHelper.read(state, cachedState, cache)).not.toEqual(state);
  });
});
