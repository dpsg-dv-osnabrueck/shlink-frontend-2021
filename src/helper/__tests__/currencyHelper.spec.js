import errorMessages from '@/data/errorMessages';
import currency from '@/helper/currencyHelper';

describe('Helper: currencyHelper', () => {
  test('No value', () => {
    expect(() => {
      currency();
    }).toThrowError(new Error(errorMessages.CURRENCY_HELPER.NO_VALUE));
  });

  test('Currency: EUR, Locale: de-DE ', () => {
    expect(currency(20, 'de-DE', 'EUR')).toBeDefined();
  });

  test('Currency: GBP, Locale: en-GB ', () => {
    expect(currency(20, 'en-GB', 'GBP')).toBeDefined();
  });

  test('Currency: USD, Locale: en-US ', () => {
    expect(currency(20, 'en-US', 'USD')).toBeDefined();
  });
});
