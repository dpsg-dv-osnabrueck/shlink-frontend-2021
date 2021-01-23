import errorMessages from '@/data/errorMessages';
import storageHelper from '@/helper/storageHelper';

describe('Helper: localStorageHelper', () => {
  const key = 'testLocalStorage';
  const value = {
    key: {
      key: 'value',
    },
  };

  test('Reading', () => {
    expect(() => {
      storageHelper.read();
    }).toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(() => {
      storageHelper.read(key);
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(storageHelper.read(key)).toBeDefined();
  });

  test('Writing', () => {
    expect(() => {
      storageHelper.write(value, null);
    }).toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(() => {
      storageHelper.write(value, key);
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(() => {
      storageHelper.write(null, key);
    }).toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_VALUE));
  });

  test('Deleting', () => {
    expect(() => {
      storageHelper.remove(null);
    }).toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));
    expect(() => {
      storageHelper.remove(key);
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));
  });

  test('Clearing', () => {
    expect(() => {
      storageHelper.clear();
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));
  });

  test('Write, Read, Delete & Clear', () => {
    expect(() => {
      storageHelper.write(value, key);
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(storageHelper.read(key)).toEqual(value);

    expect(() => {
      storageHelper.remove(key);
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(storageHelper.read(key)).toEqual('');

    expect(() => {
      storageHelper.write(value, key);
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(() => {
      storageHelper.clear();
    }).not.toThrowError(new Error(errorMessages.LOCAL_STORAGE.NO_KEY));

    expect(storageHelper.read(key)).toEqual('');
  });
});
