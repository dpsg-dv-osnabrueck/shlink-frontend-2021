import errorMessages from '@/data/errorMessages';
import dateHelper from '@/helper/dateHelper';

describe('Date Helper', () => {
  test('No value', () => {
    expect(() => {
      dateHelper();
    }).toThrowError(new Error(errorMessages.DATE_HELPER.NO_VALUE));
  });

  test('Date', () => {
    expect(dateHelper(new Date())).toBeDefined();
  });

  test('Date and Time', () => {
    expect(dateHelper(new Date(), 'dateHelper')).toBeDefined();
  });

  test('Time', () => {
    expect(dateHelper(new Date(), 'time')).toBeDefined();
  });

  test('Short date', () => {
    expect(dateHelper(new Date(), 'dateShort')).toBeDefined();
  });
});
